export const DEFAULTS = Object.freeze({seed: 73129, complexity: 68, symmetry: 8, turbulence: 36, energy: 74, palette: 'verdant'});
export const PALETTES = Object.freeze({
  verdant: {name: 'Verdant', primary: '#b8f6c0', secondary: '#5eafbd', tertiary: '#e5dca8'},
  coral: {name: 'Coral', primary: '#ffb39d', secondary: '#f4789c', tertiary: '#ffd6a5'},
  ultraviolet: {name: 'Ultraviolet', primary: '#c2b3ff', secondary: '#8d9bff', tertiary: '#77e8db'}
});
const clamp = (n, min, max, fallback = min) => Math.max(min, Math.min(max, Number.isFinite(Number(n)) ? Number(n) : fallback));
export function normalize(raw = {}) {
  return {
    seed: Math.floor(clamp(raw.seed ?? DEFAULTS.seed, 1, 2147483646)),
    complexity: Math.round(clamp(raw.complexity ?? DEFAULTS.complexity, 10, 100)),
    symmetry: Math.round(clamp(raw.symmetry ?? DEFAULTS.symmetry, 3, 12)),
    turbulence: Math.round(clamp(raw.turbulence ?? DEFAULTS.turbulence, 0, 100)),
    energy: Math.round(clamp(raw.energy ?? DEFAULTS.energy, 0, 100, DEFAULTS.energy)),
    palette: Object.hasOwn(PALETTES, raw.palette) ? raw.palette : DEFAULTS.palette
  };
}
export function rng(seed) {
  let s = Math.floor(seed) >>> 0;
  return () => { s += 0x6D2B79F5; let t=s; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
}
export function makeOrganism(raw = {}) {
  const p = normalize(raw), rand = rng(p.seed), n = p.symmetry * 9;
  const amplitude = 94 + p.energy * 0.43, irregularity = p.turbulence / 100;
  const path = [];
  for (let i=0; i<=n; i++) {
    const a = i/n * Math.PI*2;
    const lobe = Math.cos(a * p.symmetry) * (17 + p.complexity * 0.19);
    const filigree = Math.sin(a * p.symmetry * 3 + p.seed * 0.001) * p.complexity * 0.075;
    const noise = Math.sin(a * (p.symmetry+3) + p.seed) * 14 * irregularity;
    const r = amplitude + lobe + filigree + noise;
    path.push(`${i===0?'M':'L'} ${(240 + Math.cos(a)*r).toFixed(2)} ${(240 + Math.sin(a)*r).toFixed(2)}`);
  }
  const spokes = Array.from({length:p.symmetry},(_,i)=>{
    const a=(i/p.symmetry)*Math.PI*2, end=99+p.energy*0.33;
    const mid=66+p.complexity*0.15, bend=(rand()-.5)*p.turbulence*.3;
    return `M 240 240 Q ${(240+Math.cos(a+.15)*mid+bend).toFixed(1)} ${(240+Math.sin(a+.15)*mid+bend).toFixed(1)} ${(240+Math.cos(a)*end).toFixed(1)} ${(240+Math.sin(a)*end).toFixed(1)}`;
  });
  const nodes = Array.from({length:p.symmetry * Math.round(p.complexity/15)},(_,i)=>{
    const a=rand()*Math.PI*2, r=34+Math.sqrt(rand())*(83+p.energy*.3);
    return {x:Number((240+Math.cos(a)*r).toFixed(1)),y:Number((240+Math.sin(a)*r).toFixed(1)),radius:Number((1.5+rand()*3).toFixed(1))};
  });
  return {outline: path.join(' ')+' Z', spokes, nodes, symmetry:p.symmetry};
}
export function makeGenome(raw = {}, count=16) {
  const p=normalize(raw), rand=rng(p.seed ^ 0xA51E), bases=['A','C','G','T'];
  return Array.from({length:Math.max(0,Math.min(64,Math.floor(count)))},(_,i)=>({
    id:`MG-${String(i+1).padStart(3,'0')}`,
    sequence:Array.from({length:16},()=>bases[Math.floor(rand()*4)]).join(''),
    affinity:Math.round(45+rand()*55),
    active:rand() > (0.65-p.energy/500)
  }));
}
export function makeNetwork(raw = {}, count) {
  const p=normalize(raw), rand=rng(p.seed ^ 0xB10C);
  const size=Math.min(72,Math.max(8, Math.floor(count ?? (12+p.complexity*.48))));
  const nodes=Array.from({length:size},(_,i)=>{
    const a=i*2.39996323+rand()*.45, r=Math.sqrt((i+.6)/size)*.42;
    return {id:i, x:.5+Math.cos(a)*r, y:.5+Math.sin(a)*r, activity:Math.round(rand()*100)};
  });
  const edges=[];
  for (let i=1;i<nodes.length;i++) {
    let nearest=0, min=Infinity;
    for(let j=0;j<i;j++){let d=(nodes[i].x-nodes[j].x)**2+(nodes[i].y-nodes[j].y)**2;if(d<min){min=d;nearest=j;}}
    edges.push({from:i,to:nearest});
    if(i>4 && rand()<p.complexity/150){const j=Math.floor(rand()*i);if(j!==nearest)edges.push({from:i,to:j});}
  }
  return {nodes,edges};
}
export function makeSignal(raw={}, sample=0) {
  const p=normalize(raw), x=Number(sample)||0, rand=rng(p.seed);
  const phase=rand()*Math.PI*2;
  const a=Math.sin(x*.12 + phase)*(.25+p.energy/180);
  const b=Math.sin(x*.037+phase*1.7)*p.turbulence/340;
  const c=Math.sin(x*.49 + phase*.5)*p.complexity/650;
  return Math.round(clamp(52+(a+b+c)*33,0,100)*10)/10;
}
export function makeSeries(raw={}, count=54, offset=0){return Array.from({length:count},(_,i)=>makeSignal(raw,i+offset));}
export function exportProject(raw={}) { const p=normalize(raw);return JSON.stringify({format:'morphogenic-studio',version:1,configuration:p,genome:makeGenome(p),network:makeNetwork(p)},null,2); }
