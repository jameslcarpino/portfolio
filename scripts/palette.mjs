import sharp from "sharp";
async function px(file){ const {data,info}=await sharp(file).resize(120,75,{fit:"cover"}).raw().toBuffer({resolveWithObject:true}); const out=[]; for(let i=0;i<data.length;i+=3) out.push([data[i],data[i+1],data[i+2]]); return out;}
function kmeans(pts,k,it=25){ let c=[]; for(let i=0;i<k;i++) c.push(pts[Math.floor(i*pts.length/k)]); for(let t=0;t<it;t++){ const sum=Array.from({length:k},()=>[0,0,0,0]); for(const p of pts){ let b=0,bd=1e9; for(let i=0;i<k;i++){const d=(p[0]-c[i][0])**2+(p[1]-c[i][1])**2+(p[2]-c[i][2])**2; if(d<bd){bd=d;b=i;}} sum[b][0]+=p[0];sum[b][1]+=p[1];sum[b][2]+=p[2];sum[b][3]++; } c=sum.map((s,i)=>s[3]?[s[0]/s[3],s[1]/s[3],s[2]/s[3],s[3]]:[...c[i],0]); } return c.sort((a,b)=>b[3]-a[3]); }
const hex=c=>"#"+c.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");
for (const [name,f] of [["bridge","scene-src/overpass.jpg"],["train","scene-src/train.jpg"]]) {
  const p=await px(f); const c=kmeans(p,10);
  console.log(name); for(const k of c) console.log(" ",hex(k),Math.round(k[3]/p.length*100)+"%");
}
