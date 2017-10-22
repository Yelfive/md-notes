# Create Project

## Usage

```bash
  create-project [options] [--] [<package>] [<directory>] [<version>]
```

## Arguments

```text
  package                              Package name to be installed
  directory                            Directory where the files should be created
  version                              Version, will default to latest
```

## Options

```text
  -s, --stability=STABILITY            Minimum-stability allowed (unless a version is specified).
      --prefer-source                  Forces installation from package sources when possible, including VCS information.
      --prefer-dist                    Forces installation from package dist even for dev versions.
      --repository=REPOSITORY          Pick a different repository (as url or json config) to look for the package.
      --repository-url=REPOSITORY-URL  DEPRECATED: Use --repository instead.
      --dev                            Enables installation of require-dev packages (enabled by default, only present for BC).
      --no-dev                         Disables installation of require-dev packages.
      --no-custom-installers           DEPRECATED: Use no-plugins instead.
      --no-scripts                     Whether to prevent execution of all defined scripts in the root package.
      --no-progress                    Do not output download progress.
      --no-secure-http                 Disable the secure-http config option temporarily while installing the root package. Use at your own risk. Using this flag is a bad idea.
      --keep-vcs                       Whether to prevent deletion vcs folder.
      --no-install                     Whether to skip installation of the package dependencies.
      --ignore-platform-reqs           Ignore platform requirements (php & ext- packages).
  -h, --help                           Display this help message
  -q, --quiet                          Do not output any message
  -V, --version                        Display this application version
      --ansi                           Force ANSI output
      --no-ansi                        Disable ANSI output
  -n, --no-interaction                 Do not ask any interactive question
      --profile                        Display timing and memory usage information
      --no-plugins                     Whether to disable plugins.
  -d, --working-dir=WORKING-DIR        If specified, use the given directory as working directory.
  -v|vv|vvv, --verbose                 Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

## Help

The `create-project` command creates a new project from a given
package into a new directory. If executed without params and in a directory
with a composer.json file it installs the packages for the current project.

You can use this command to bootstrap new projects or setup a clean
version-controlled installation for developers of your project.

```bash
php composer.phar create-project vendor/project target-directory [version]
```

You can also specify the version with the package name using `=` or `:` as separator.

```bash
php composer.phar create-project vendor/project:version target-directory
```

To install unstable packages, either specify the version you want, or use the
`--stability=dev` (where dev can be one of RC, beta, alpha or dev).

To setup a developer workable version you should create the project using the source
controlled code by appending the `--prefer-source` flag.

To install a package from another repository than the default one you
can pass the `--repository=https://myrepository.org` flag.
  
