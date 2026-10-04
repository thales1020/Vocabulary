"""Helpers for writing practice exams.

Each exam module defines ``META`` and a list ``QS`` built with :func:`Q`.
The correct option is written first; ``build_exams.py`` shuffles options with a
fixed seed so answer letters are spread evenly. Pass ``fix=<index>`` to keep the
written order (e.g. ordered numbers or "Tất cả") and mark the correct option.
Explanations must not refer to option letters, because letters change on shuffle.
"""

SOURCES = {
    'dlai-improve': 'deeplearning.ai – Improving Deep Neural Networks',
    'dlai-struct': 'deeplearning.ai – Structuring Machine Learning Projects',
    'cs231n': 'Stanford CS231n – CNNs for Visual Recognition',
    'd2l': 'Dive into Deep Learning (d2l.ai)',
    'pt-tl': 'PyTorch – Transfer Learning for Computer Vision tutorial',
    'hf': 'Hugging Face LLM Course',
    'cs224n': 'Stanford CS224n – NLP with Deep Learning',
    'sklearn': 'scikit-learn User Guide',
    'ioai': 'IOAI Syllabus (Computer Vision, Generative, Self-supervised)',
    'ph-final': 'IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01)',
    'ph-semi': 'IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02)',
    'test03': 'Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án)',
    'hu-r1': 'Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04)',
}


def Q(src, stem, correct, wrongs=None, exp='', fix=None, ref=None):
    """ref: where an existing question was taken from (e.g. 'Chương 1, quiz'); None for newly written ones."""
    assert src in SOURCES, src
    if fix is None:
        assert len(wrongs) == 3, stem
        d = {'options': [correct] + list(wrongs), 'answer': 0, 'shuffle': True}
    else:
        assert wrongs is None and len(correct) == 4, stem
        d = {'options': list(correct), 'answer': fix, 'shuffle': False}
    d.update(src=src, q=stem, explain=exp, ref=ref)
    return d


def table(rows, head=True):
    out = '<div class="tbl"><table>'
    for i, r in enumerate(rows):
        tag = 'th' if head and i == 0 else 'td'
        out += '<tr>' + ''.join(f'<{tag}>{c}</{tag}>' for c in r) + '</tr>'
    return out + '</table></div>'


def frac(a, b):
    return f'<span class="frac"><span>{a}</span><span>{b}</span></span>'


def pre(code):
    return '<pre>' + code.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') + '</pre>'


def M(src, stem, options, answers, exp, ref):
    """Multi-select question: every true statement must be chosen (Hungarian olympiad format)."""
    assert src in SOURCES, src
    assert answers and all(0 <= a < len(options) for a in answers), stem
    return {'src': src, 'q': stem, 'options': list(options), 'answer': sorted(answers), 'multi': True,
            'shuffle': False, 'explain': exp, 'ref': ref}
