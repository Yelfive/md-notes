# Docker Troubleshooting

## driver "overlay" failed to remove root filesystem, ... device or resource busy

The filesystem for the container is still mounted, so the container cannot be removed.

Involved commands: `up`, `rm`