# LaTex Document Structure

```latex
%导言区
\documentclass{article} %book, report，letter

\title{My First Document}
\author{Felix Huang}
\date{\today}

%正文区(文稿区)
\begin{document}
    \maketitle
    Hello world!
    %here is my big formula
    Let $f(x)$be defined by the formula $$f(x)=3x^2+x-1$$ which is a polynomial of degree 2.
\end{document}
```

- 导言区用作全局设置
- 正文区只能有一个为 `document`
- `%` 开头为注释
- `$` 或 `$$` 之间为数学公式, 其中 `$` 之间为行内数学公式, `$$` 之间为块公式

## 中文支持

```latex
% Use `ctex` package to enable Chinese
\usepackage{ctex}
```

或者

```latex
\documentclass{ctexart}
```
