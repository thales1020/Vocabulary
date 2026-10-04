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
