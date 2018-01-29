# POSIX Regular Expression

Regular expressions follow two standards: **Perl** and **POSIX**

Most advanced programming language(such as PHP) follows Perl, however Linux bash follows the **POSIX** standard. And they are described as follows:

## 1. Basic Regular Expression, or Basic RegEx, shorten as BREs

## 2. Extended Regular Expression, or Extended RegEx, shorten as EREs

### character class

name    | meaning   | name  | meaning
---     |---        |---    |---    
alnum   | Alphabet or numeric   Characters | digit | Numeric characters

## 3. Perl Regular Expression, or Perl RegEx, shorten as PREs

```bash
[:alnum:]
```

           alnum    digit    punct
           alpha    graph    space
           blank    lower    upper
           cntrl    print    xdigit

```bash
grep [[:digit:]]
grep [[:digit:][:alpha:]]
```

