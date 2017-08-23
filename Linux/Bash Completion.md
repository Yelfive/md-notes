Bash Completion
===

1. Install bash completion

    **CentOS**

    > yum install -y bash-completion

    **Ubuntu**

    > apt-get install -y bash-completion
    
    **Mac**

    > brew install bash-completion

2. Place the completion in `/etc/bash_completion.d/`

3. source the completion bash

    **Linux**

    > . /usr/share/bash-completion/bash_completion

    **Mac**

    > . /usr/local/etc/bash_completion
    
        ```bash
        # add to ~/.bash_profile
        # to auto start
        if [ -f $(brew --prefix)/etc/bash_completion ]; then
            . $(brew --prefix)/etc/bash_completion
        fi
        ```

4. Enjoy!

### Notice

1. How to custom a completion

