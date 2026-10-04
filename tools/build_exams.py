"""Build docs/exams/*.js from the exam modules in tools/exams and check for duplicates.

Usage: python3 tools/build_exams.py
"""
import difflib
import html
import json
import random
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'tools' / 'exams'))
from common import SOURCES  # noqa: E402

EXAM_MODULES = ['de01']
OUT = ROOT / 'docs' / 'exams'
SIMILARITY_LIMIT = 0.9  # stems at or above this ratio count as duplicates


def plain(s):
    s = re.sub(r'<[^>]+>', ' ', s)
    s = html.unescape(s).lower()
    return re.sub(r'\s+', ' ', s).strip()


def load_006():
    text = (ROOT / 'docs' / 'exams' / 'de006.js').read_text()
    start = text.index('window.EXAMS["006"] = ') + len('window.EXAMS["006"] = ')
    data = json.loads(text[start:text.rindex(';')])
    return data


def build(mod):
    exam = __import__(mod)
    meta, qs = exam.META, exam.QS
    rng = random.Random(meta['key'])
    qs = list(qs)
    rng.shuffle(qs)
    out = []
    counts = [0, 0, 0, 0]
    for q in qs:
        if not q['shuffle']:
            counts[q['answer']] += 1
    for n, q in enumerate(qs, 1):
        opts, ans = list(q['options']), q['answer']
        if q['shuffle']:
            # put the correct option on the least used letter so far, the others in random order
            low = min(counts)
            ans = rng.choice([i for i in range(4) if counts[i] == low])
            rest = [o for i, o in enumerate(q['options']) if i != q['answer']]
            rng.shuffle(rest)
            opts = rest[:ans] + [q['options'][q['answer']]] + rest[ans:]
        counts[ans] += q['shuffle']
        src = SOURCES[q['src']]
        origin = (f'Câu có sẵn, đã dịch: {src} · {q["ref"]}' if q['ref'] else f'Câu soạn mới theo: {src}')
        out.append({'id': n, 'q': q['q'], 'options': opts, 'answer': ans, 'explain': q['explain'], 'source': origin})
    return meta, out


def main():
    exams = {'006': load_006()}
    built = []
    for mod in EXAM_MODULES:
        meta, qs = build(mod)
        exams[meta['key']] = {'title': meta['title'], 'desc': meta['desc'], 'questions': qs}
        built.append(meta['key'])

    # Duplicate check across every exam, including 006.
    items = [(k, q['id'], plain(q['q']), plain(' '.join(q['options']))) for k, e in exams.items() for q in e['questions']]
    problems = 0
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            a, b = items[i], items[j]
            if a[0] == b[0] == '006':
                continue  # 006 is the original paper; its own repeats (e.g. 23 and 62) are kept as is
            if a[2] == b[2] and a[3] == b[3]:
                print(f'DUPLICATE {a[0]}#{a[1]} == {b[0]}#{b[1]}: {a[2][:80]}')
                problems += 1
                continue
            r = difflib.SequenceMatcher(None, a[2] + a[3], b[2] + b[3]).ratio()
            if r >= SIMILARITY_LIMIT:
                print(f'SIMILAR {r:.2f} {a[0]}#{a[1]} ~ {b[0]}#{b[1]}: {a[2][:70]}')
                problems += 1
    if problems:
        sys.exit(f'{problems} duplicate(s) found')

    for key in built:
        e = exams[key]
        letters = ['ABCD'[q['answer']] for q in e['questions']]
        print(key, len(e['questions']), {c: letters.count(c) for c in 'ABCD'})
        js = (f'// {e["title"]} – sinh bởi tools/build_exams.py, không sửa tay.\n'
              f'window.EXAMS = window.EXAMS || {{}};\nwindow.EXAMS[{json.dumps(key)}] = '
              + json.dumps(e, ensure_ascii=False, indent=1) + ';\n')
        (OUT / f'{key}.js').write_text(js)
    print('OK, no duplicates')


if __name__ == '__main__':
    main()
