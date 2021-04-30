# Bash Completion

1. Install bash completion

    **CentOS**

    ```shell
    yum install -y bash-completion
    ```

    **Ubuntu**

    ```shell
    apt-get install -y bash-completion
    ```

    **Mac**

    ```shell
    brew install bash-completion
    ```

2. Place the completion in `/etc/bash_completion.d/`

3. source the completion bash

    **Linux**

    ```bash
    . /usr/share/bash-completion/bash_completion
    ```

    **Mac**

    ```bash
    . /usr/local/etc/bash_completion
    ```

    ```bash
    # add to ~/.bash_profile
    # to auto start
    if [ -f $(brew --prefix)/etc/bash_completion ]; then
        . $(brew --prefix)/etc/bash_completion
    fi
    ```

4. Enjoy!

## Notice

1. How to custom a completion

## Appendix

docker: https://docs.docker.com/machine/completion/
