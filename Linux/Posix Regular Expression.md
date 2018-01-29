# POSIX Regular Expression

Regular expressions follow two standards: **Perl** and **POSIX**

Most advanced programming language(such as PHP) follows Perl, however Linux bash follows the **POSIX** standard. And they are described as follows:

## 1. Basic Regular Expression, or Basic RegEx, shorten as BREs

## 2. Extended Regular Expression, or Extended RegEx, shorten as EREs

### `.`

Matches any single character (many applications exclude newlines, and exactly which characters are considered newlines is flavor, character encoding, and platform specific, but it is safe to assume that the line feed character is included). Within POSIX bracket expressions, the dot character matches a literal dot. For example, a.c matches "abc", etc., but [a.c] matches only "a", ".", or "c".

- `[ ]` 
    A bracket expression. Matches a single character that is contained within the brackets. For example, [abc] matches "a", "b", or "c". [a-z] specifies a range which matches any lowercase letter from "a" to "z". These forms can be mixed: [abcx-z] matches "a", "b", "c", "x", "y", or "z", as does [a-cx-z].
The - character is treated as a literal character if it is the last or the first (after the ^) character within the brackets: [abc-], [-abc]. Note that backslash escapes are not allowed. The ] character can be included in a bracket expression if it is the first (after the ^) character: []abc].
[^ ] | Matches a single character that is not contained within the brackets. For example, [^abc] matches any character other than "a", "b", or "c". [^a-z] matches any single character that is not a lowercase letter from "a" to "z". As above, literal characters and ranges can be mixed.
^   Matches the starting position within the string. In line-based tools, it matches the starting position of any line.
$ | Matches the ending position of the string or the position just before a string-ending newline. In line-based tools, it matches the ending position of any line.
BRE: \( \)  \(aaa\) <br/> ERE: ( ) | Defines a marked subexpression. The string matched within the parentheses can be recalled later (see the next entry, \n). A marked subexpression is also called a block or capturing group.
\n | Matches what the nth marked subexpression matched, where n is a digit from 1 to 9. This construct is theoretically irregular and was not adopted in the POSIX ERE syntax. Some tools allow referencing more than nine capturing groups.
* | Matches the preceding element zero or more times. For example, ab*c matches "ac", "abc", "abbbc", etc. [xyz]* matches "", "x", "y", "z", "zx", "zyx", "xyzzy", and so on. \(ab\)* (in BRE) or (ab)* (in ERE) matches "", "ab", "abab", "ababab", and so on.
BRE: \+<br/>ERE: + | Matches the preceding element one or more times. For example, ab\+c (in BRE) or ab+c (in ERE) matches "abc", "abbbc", etc., but not "ac", [xyz]\+ (in BRE) or [xyz]+ (in ERE) matches "x", "y", "z", "zx", "zyx", "xyzzy", and so on. \(ab\)\+ (in BRE) or (ab)+ (in ERE) matches "ab", "abab", "ababab", and so on.
BRE: \?<br/>ERE: ? | Matches the preceding element one or zero times. For example, ab\?c (in BRE) or ab?c (in ERE) matches either "ac" or "abc", while \(ab\)\? (in BRE) or (ab)? (in ERE) matches "" or "ab".
BRE: \|<br/>ERE: | | Matches the preceding element or the following element. For example, abc\|def (in BRE) or abc|def (in ERE) matches either "abc" or "def".
BRE: \{m,n\}<br/>ERE: {m,n} | Matches the preceding element at least m and not more than n times. For example, a\{3,5\} (in BRE) or a{3,5} (in ERE) matches only "aaa", "aaaa", and "aaaaa".
BRE: \{m\}<br/>ERE: {m} | Matches the preceding element exactly m times.
BRE: \{m,\}<br/>ERE: {m,} | Matches the preceding element at least m times.
BRE: \{,n\}<br/>ERE: {,n} | Matches the preceding element not more than n times. For example, ba\{,2\}b (in BRE) or ba{,2}b (in ERE) matches only "bb", "bab", and "baab".

### character class

name    | meaning   | name  | meaning   | name  | meaning
---     |---        |---    |---        | ---   | ---
*alnum*   | Alphabet or numeric characters | *digit* | Numeric characters| *punct* | Punctuations
alpha   | Alphabet characters   | graph | 

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

## Appendix

- [WiKiBooks](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX-Extended_Regular_Expressions)