/**
 * India3DMap.jsx
 * ──────────────────────────────────────────────────────────────────
 * Renders a true 3D extruded India map using REAL geographic GeoJSON
 * data fetched from a public CDN. Each state is individually extruded
 * using accurate projected coordinates, PBR materials, studio lighting,
 * and a slow floating animation — on a fully transparent background.
 * ──────────────────────────────────────────────────────────────────
 */

import React, {
  useRef, useMemo, Suspense, useState, useEffect,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrthographicCamera, Edges, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ─── Brand colours ───────────────────────────────────────────────────────────
const C_NAVY  = new THREE.Color('#0d2247');
const C_MID   = new THREE.Color('#173566');
const C_LIGHT = new THREE.Color('#1e4080');
const C_ORANGE = new THREE.Color('#e85d0a');

const ACCENT_STATES = new Set([
  'Tamil Nadu', 'Gujarat', 'West Bengal', 'Delhi',
  'Goa', 'Andhra Pradesh', 'Kerala',
]);

// ─── India geographic bounding box ───────────────────────────────────────────
const BOUNDS = { minLon: 68.1, maxLon: 97.4, minLat: 8.0, maxLat: 37.1 };

// ─── Web Mercator projection ──────────────────────────────────────────────
const R = 6378137; // Earth radius in meters
function mercatorX(lon) {
  return R * (lon * Math.PI / 180);
}
function mercatorY(lat) {
  return R * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2));
}

const minX = mercatorX(BOUNDS.minLon);
const maxX = mercatorX(BOUNDS.maxLon);
const minY = mercatorY(BOUNDS.minLat);
const maxY = mercatorY(BOUNDS.maxLat);

const mercatorW = maxX - minX;
const mercatorH = maxY - minY;

const MAP_W  = 12;  // Three.js units wide
const MAP_H  = MAP_W * (mercatorH / mercatorW);

function project(lon, lat) {
  const x = ((mercatorX(lon) - minX) / mercatorW - 0.5) * MAP_W;
  const y = ((mercatorY(lat) - minY) / mercatorH - 0.5) * MAP_H;
  return [x, y];
}

// ─── Build a Three.Shape from a GeoJSON ring (with optional holes) ────────────
function ringToThreeShape(outerRing, holes = []) {
  if (!outerRing || outerRing.length < 3) return null;
  const shape = new THREE.Shape();
  const [[x0, y0], ...rest] = outerRing.map(([lon, lat]) => project(lon, lat));
  shape.moveTo(x0, y0);
  rest.forEach(([x, y]) => shape.lineTo(x, y));
  shape.closePath();

  holes.forEach((hole) => {
    if (!hole || hole.length < 3) return;
    const path = new THREE.Path();
    const [[hx0, hy0], ...hrest] = hole.map(([lon, lat]) => project(lon, lat));
    path.moveTo(hx0, hy0);
    hrest.forEach(([x, y]) => path.lineTo(x, y));
    path.closePath();
    shape.holes.push(path);
  });

  return shape;
}

// ─── Convert GeoJSON geometry → array of {shape, geometry} ──────────────────
function geomToShapes(geomType, coords) {
  const shapes = [];
  if (geomType === 'Polygon') {
    const [outer, ...holes] = coords;
    const s = ringToThreeShape(outer, holes);
    if (s) shapes.push(s);
  } else if (geomType === 'MultiPolygon') {
    coords.forEach(([outer, ...holes]) => {
      const s = ringToThreeShape(outer, holes);
      if (s) shapes.push(s);
    });
  }
  return shapes;
}

// ─── Single state mesh ───────────────────────────────────────────────────────
function StateMesh({ stateName, shapes, index }) {
  const meshRefs = useRef([]);
  const [hovered, setHovered] = useState(false);
  const isAccent = ACCENT_STATES.has(stateName);

  const baseColor = useMemo(() => {
    if (isAccent) return C_ORANGE.clone();
    return (index % 3 === 0 ? C_NAVY : index % 3 === 1 ? C_MID : C_LIGHT).clone();
  }, [isAccent, index]);

  const hoverColor = useMemo(() => new THREE.Color('#ff7733'), []);

  const geometries = useMemo(() => shapes.map((shape) => {
    const geo = new THREE.ExtrudeGeometry(shape, {
      steps: 1,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.018,
      bevelSegments: 4,
    });
    geo.computeVertexNormals();
    return geo;
  }), [shapes]);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: baseColor.clone(),
    metalness: 0.15,
    roughness: 0.35,
    envMapIntensity: 0.9,
  }), [baseColor]);

  useFrame(() => {
    const target = hovered ? hoverColor : baseColor;
    material.color.lerp(target, 0.07);
    meshRefs.current.forEach((m) => {
      if (m) {
        const tz = hovered ? 1.5 : 1.0;
        m.scale.z += (tz - m.scale.z) * 0.1;
      }
    });
  });

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {geometries.map((geo, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          geometry={geo}
          material={material}
          castShadow
          receiveShadow
        >
          <Edges threshold={25} color="#0a1830" lineWidth={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─── All India states rendered from GeoJSON ──────────────────────────────────
function IndiaMap({ features, prefersReducedMotion }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current || prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 0.28) * 0.015;
  });

  const stateData = useMemo(() => features.map((feature, i) => {
    const p = feature.properties || {};
    // Handle different GeoJSON property name conventions
    const name = p.ST_NM || p.NAME_1 || p.name || p.State || p.state || p.STNAME || `State_${i}`;
    const type   = feature.geometry.type;
    const coords = feature.geometry.coordinates;
    const shapes = geomToShapes(type, coords);
    return { name, shapes, index: i };
  }).filter(s => s.shapes.length > 0), [features]);

  return (
    <group
      ref={groupRef}
      // Center the map vertically: India's aspect is ~tall, shift up slightly
      position={[0, -MAP_H * 0.04, 0]}
      rotation={[0, 0, 0]}
    >
      {stateData.map(({ name, shapes, index }) => (
        <StateMesh
          key={name}
          stateName={name}
          shapes={shapes}
          index={index}
        />
      ))}
    </group>
  );
}

// ─── Scene with full studio lighting ─────────────────────────────────────────
function Scene({ features, prefersReducedMotion }) {
  return (
    <>
      <ambientLight intensity={0.5} color="#b8cae8" />
      <directionalLight
        position={[5, 10, 8]}
        intensity={2.0}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-bias={-0.0004}
      />
      {/* Warm fill */}
      <directionalLight position={[-6, -4, 4]} intensity={0.35} color="#ffdbb0" />
      {/* Cool rim */}
      <directionalLight position={[8, 6, -3]} intensity={0.45} color="#90b8ff" />
      {/* Under bounce */}
      <directionalLight position={[0, -9, 4]} intensity={0.18} color="#6080c0" />

      <Environment preset="city" />

      <ContactShadows 
        position={[0, -MAP_H / 2 - 0.5, 0]} 
        opacity={0.5} 
        scale={30} 
        blur={2.5} 
        far={10} 
        resolution={512} 
        color="#082452" 
      />

      <IndiaMap features={features} prefersReducedMotion={prefersReducedMotion} />
    </>
  );
}

// ─── Loading spinner ─────────────────────────────────────────────────────────
function MapLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-14 h-14 rounded-full border-4 border-blue-200 border-t-orange-500 animate-spin" />
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function MapError({ onRetry }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <p className="text-sm text-gray-400">Failed to load map data</p>
      <button
        onClick={onRetry}
        className="text-xs px-4 py-2 bg-corporate-blue text-white rounded hover:bg-navy-blue"
      >
        Retry
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────────────
export default function India3DMap({ className = '' }) {
  const [features, setFeatures] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(false);

    // Two real GeoJSON sources — try primary, fall back to secondary
    const SOURCES = [
      // Source 1 — well-known India states GeoJSON (ST_NM property)
      'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson',
      // Source 2 — alternative Natural Earth simplified
      'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States',
    ];

    for (const url of SOURCES) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        const feats = data?.features;
        if (feats && feats.length > 0) {
          setFeatures(feats);
          setLoading(false);
          return;
        }
      } catch {
        // try next source
      }
    }

    // All sources failed
    setError(true);
    setLoading(false);
  };

  const [zoom, setZoom] = useState(36);

  useEffect(() => {
    loadData();
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReduced(mq.matches);
      
      const handleResize = () => {
        setZoom(window.innerWidth < 768 ? 16 : 36);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  if (loading) return <MapLoader />;
  if (error || !features || features.length === 0) return <MapError onRetry={loadData} />;


  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={<MapLoader />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          shadows
          style={{ background: 'transparent', position: 'absolute', inset: 0 }}
          frameloop="always"
          dpr={[1, Math.min(2, (typeof window !== 'undefined' && window.devicePixelRatio) || 1)]}
        >
          {/*
            OrthographicCamera:
            - Position straight ahead on Z axis
            - NO X/Y/Z rotation → map faces viewer perfectly perpendicular
            - Zoom scales apparent size without perspective distortion
          */}
          <OrthographicCamera
            makeDefault
            position={[0, 0, 30]}
            zoom={zoom}
            near={0.1}
            far={200}
          />

          <Scene features={features} prefersReducedMotion={prefersReduced} />
        </Canvas>
      </Suspense>

      {/* Floating shadow beneath the map */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '4%',
          left: '50%',
          width: '50%',
          height: '28px',
          background: 'radial-gradient(ellipse, rgba(13,34,71,0.4) 0%, transparent 70%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
          animation: 'india3dShadow 6.5s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes india3dShadow {
          0%,100% { transform:translateX(-50%) scaleX(1);   opacity:.7; }
          50%      { transform:translateX(-50%) scaleX(.7);  opacity:.25; }
        }
      `}</style>
    </div>
  );
}
