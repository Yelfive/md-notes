# Git Troubleshooting

## fatal: protocol 'https' is not supported

You tried to paste it using <kbd>CTRL-V</kbd>, a hidden character my be in front of `https` like `^?https`, so it is not that the string `https` is invalid, but the strange string `^?https`.

See also: [stack  overflow](https://stackoverflow.com/questions/53988638/git-fatal-protocol-https-is-not-supported)
