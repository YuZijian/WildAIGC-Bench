#!/usr/bin/env python3
"""Score normalized JSONL: sample_id, gt (0/1), pred_fake (0/1/null), unknown.
Nested released predictions also supported with --method; their gt is 1.
Unknown/null maps to real, separately counted. No inference or image download.
"""
import argparse,json
from pathlib import Path

def score(records):
    counts=dict(tp=0,fp=0,tn=0,fn=0,unknown_count=0);seen=set()
    for r in records:
        sid=r['sample_id']
        if not isinstance(sid,str) or not sid or sid in seen:raise ValueError('Missing/duplicate sample_id')
        seen.add(sid);gt=r['gt'];p=r['pred_fake'];u=r.get('unknown',False)
        if type(gt) is not int or gt not in (0,1):raise ValueError('gt must be integer 0 or 1')
        if p is not None and (type(p) is not int or p not in (0,1)):raise ValueError('pred_fake must be 0, 1 or null')
        if type(u) is not bool:raise ValueError('unknown must be boolean')
        u=u or p is None;counts['unknown_count']+=int(u);p=0 if u else p
        counts[('tp' if p else 'fn') if gt else ('fp' if p else 'tn')]+=1
    n=len(seen)
    if not n:raise ValueError('Empty input')
    nf=counts['tp']+counts['fn'];nr=n-nf
    return dict(n=n,n_fake=nf,n_real=nr,**counts,recall=counts['tp']/nf if nf else None,fpr=counts['fp']/nr if nr else None,acc=(counts['tp']+counts['tn'])/n,unknown_rate=counts['unknown_count']/n)

def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('predictions',type=Path);ap.add_argument('--method',help='Method key for released nested predictions, e.g. dda')
    ap.add_argument('--manifest',type=Path,help='Require exact sample IDs from frozen release_manifest.json')
    args=ap.parse_args();records=[json.loads(x) for x in args.predictions.read_text().splitlines() if x.strip()]
    if args.method:records=[dict(sample_id=r['sample_id'],gt=1,**r['predictions'][args.method]) for r in records]
    metrics=score(records)
    if args.manifest:
        expected={r['sample_id'] for r in json.loads(args.manifest.read_text())['samples']}
        if {r['sample_id'] for r in records}!=expected:raise ValueError('Sample IDs differ from release manifest')
    print(json.dumps(metrics,indent=2,allow_nan=False))
if __name__=='__main__':main()
