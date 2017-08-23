Manual
======

```

> man cmd

cmd(1), cmd(2)

```

The standard sections of the manual include:

- 1 [User Commands][1]

    > user commands and tools, for example, file manipulation tools, shells, compilers, web browsers, file and image viewers and editors, and so on.

- 2 [System Calls][2] see also [system call list](./system+call.md)

    >  A system
       call is an entry point into the Linux kernel.  Usually, system calls
       are not invoked directly: instead, most system calls have
       corresponding C library wrapper functions which perform the steps
       required (e.g., trapping to kernel mode) in order to invoke the
       system call.  Thus, making a system call looks the same as invoking a
       normal library function.

- 3 [C Library Functions][3]

    > All library functions excluding the
       library functions (system call wrappers) described in Section 2,
       which implement system calls.

    > Many of the functions described in the section are part of the
       Standard C Library (libc).  Some functions are part of other
       libraries (e.g., the math library, libm, or the real-time library,
       librt) in which case the manual page will indicate the linker option
       needed to link against the required library (e.g., -lm and -lrt,
       respectively, for the aforementioned libraries).

    > In some cases, the programmer must define a feature test macro in
       order to obtain the declaration of a function from the header file
       specified in the man page SYNOPSIS section.  (Where required, these
       feature test macros must be defined before including any header
       files.)  In such cases, the required macro is described in the man
       page.  For further information on feature test macros, see
       [feature_test_macros(7)][macro].

- 4 [Devices and Special Files][4]

    > Describes special files (devices).

- 5 [File Formats and File-systems][5]

    > Describes various file formats, as well as
       the corresponding C structures, if any.  In addition, there are a
       number of pages that document various file-systems.


- 6 [Games et. Al.][6]

    > Describes all the games and funny little programs available on the system.

- 7 [Miscellanea][7]

    > Provides overviews on various topics, 
        and describes conventions and protocols, character set standards,
        the standard file-system layout, and miscellaneous other things.

- 8 [Administration and Privileged commands][8]
    
    > Describes commands which either can be or are
       used only by the superuser, like system-administration commands,
       daemons, and hardware-related commands.

    > As with the commands described in Section 1, the commands described
       in this section terminate with an exit status that indicates whether
       the command succeeded or failed.  See [intro(1)][1] for more information.

Appendix:
---------

- [User Commands][1]
- [System Calls][2]
- [C Library Functions][3]
- [Devices and Special Files][4]
- [File Formats and File-systems][5]
- [Games et. Al.][6]
- [Miscellanea][7]
- [Administration and Privileged commands][8]

[1]: http://man7.org/linux/man-pages/man1/intro.1.html
[2]: http://man7.org/linux/man-pages/man2/intro.2.html
[3]: http://man7.org/linux/man-pages/man2/intro.3.html
[4]: http://man7.org/linux/man-pages/man2/intro.4.html
[5]: http://man7.org/linux/man-pages/man2/intro.5.html
[6]: http://man7.org/linux/man-pages/man2/intro.6.html
[7]: http://man7.org/linux/man-pages/man2/intro.7.html
[8]: http://man7.org/linux/man-pages/man2/intro.8.html

[macro]: http://man7.org/linux/man-pages/man7/feature_test_macros.7.html




