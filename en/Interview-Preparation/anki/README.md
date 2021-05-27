# README

This directory contains markdown files to be converted using[markdown-anki-decks · PyPI](https://pypi.org/project/markdown-anki-decks/) into [anki](https://apps.ankiweb.net/).

1. python version >=3.7

2. install

    ```shell
    pip install markdown-anki-decks
    ```

    the executable file will be at

    ```bash {10}
    > pip show markow-anki-decks

    Name: markdown-anki-decks
    Version: 1.0.0
    Summary: A command line program to convert markdown files into anki decks.
    Home-page: https://github.com/lukesmurray/markdown-anki-decks
    Author: Luke Murray
    Author-email: lukepigeonmail@gmail.com
    License: MIT
    Location: c:\users\administrator\appdata\local\packages\pythonsoftwarefoundation.python.3.9_qbz5n2kfra8p0\localcache\local-packages\python39\site-packages
    Requires: typer, python-frontmatter, shellingham, Markdown, beautifulsoup4, colorama, genanki
    Required-by:
    ```

    Under `python39\Scripts`, there's a `mdankideck` add that to `PATH`.

3. Install anki connect

    [AnkiConnect - AnkiWeb](https://ankiweb.net/shared/info/2055492159)

    code: 2055492159

4. Convert and sync

    run the command under the **root of this README.md** file

    ```bash
    mdankideck input output --sync
    ```

    convert, sync, and delete the old card in anki

The _.apkg_ file will appear under output and be synced to anki app.
