import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULTS,normalize,rng,makeOrganism,makeGenome,makeNetwork,makeSignal,makeSeries,exportProject} from '../public/engine.mjs';
test('settings are bounded and unsafe palette names fall back',()=>{
  const p=normalize({seed:-100,complexity:10000,symmetry:1,turbulence:-8,energy:NaN,palette:'<svg>'});
  assert.equal(p.seed,1);assert.equal(p.complexity,100);assert.equal(p.symmetry,3);assert.equal(p.turbulence,0);assert.equal(p.energy,74);assert.equal(p.palette,'verdant');
});
test('deterministic seeded generator',()=>{
  assert.deepEqual(makeOrganism(DEFAULTS),makeOrganism(DEFAULTS));
  assert.notDeepEqual(makeOrganism({...DEFAULTS,seed:5}),makeOrganism(DEFAULTS));
  assert.equal(rng(42)(),rng(42)());
});
test('genome output contains only DNA bases',()=>{
  const g=makeGenome(DEFAULTS);assert.equal(g.length,16);
  assert.equal(new Set(g.map(x=>x.id)).size,16);
  for(const strand of g){assert.match(strand.sequence,/^[ACGT]{16}$/);assert.ok(strand.affinity>=45&&strand.affinity<=100);}
});
test('network remains fully connected with valid edge references and bounded nodes',()=>{
  const graph=makeNetwork(DEFAULTS);assert.ok(graph.edges.length>=graph.nodes.length-1);
  for(const node of graph.nodes){assert.ok(node.x>=0&&node.x<=1&&node.y>=0&&node.y<=1);}
  const parent=new Map(graph.nodes.map(n=>[n.id,n.id]));
  function root(id){return parent.get(id)===id?id:root(parent.get(id));}
  for(const e of graph.edges){assert.ok(e.from>=0&&e.from<graph.nodes.length&&e.to>=0&&e.to<graph.nodes.length);parent.set(root(e.from),root(e.to));}
  assert.equal(new Set(graph.nodes.map(n=>root(n.id))).size,1);
});
test('signal samples are finite and bounded',()=>{assert.equal(makeSeries(DEFAULTS,54).length,54);for(let i=-100;i<400;i++)assert.ok(makeSignal(DEFAULTS,i)>=0&&makeSignal(DEFAULTS,i)<=100);});
test('export includes recoverable validated settings',()=>{const value=JSON.parse(exportProject(DEFAULTS));assert.equal(value.version,1);assert.equal(value.configuration.seed,DEFAULTS.seed);assert.equal(value.genome.length,16);assert.ok(value.network.nodes.length>0);});
