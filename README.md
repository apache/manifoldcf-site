Apache ManifoldCF Website
=============================

This is the source of the Apache ManifoldCF team's website, 
found at https://manifoldcf.apache.org/

## How to build the ManifoldCF Site:
This builds the website and puts its pages in output/

```bash
virtualenv $venvname
source $venvname/bin/activate
pip install -r requirements.txt

git pull origin master

# Edit all the markdown! (manifoldcf-site/content/pages/)

pelican -t theme
```

To preview:

```bash
cd output/
python -m pelican.server
# Browse to localhost:8000
```

## Technical site documentation:
Any time you check in a file, the site regenerates:
https://ci2.apache.org/#/builders/3

## Preparation
The `gfm_reader.py` script points to a specific directory on
bb-slave1 for loading the `libcmark-gfm.so` and `libcmark-gfmextensions.so`
libraries. The path should be adjusted for your local installation.

Run `build_cmark.sh` to build the two libraries. It is
then helpful to create a directory (say, `build_cmark/lib`) with
two symlinks from the `.so` to the longer, version-specific libraries
that the above shell script builds.

## Preview PRs
To stage a preview of what a PR would result in, be sure to name your branches 
using the `preview/$foo` syntax, for instance `preview/cleanup-dec-2021`. This 
will auto-build and -stage your changes and make them available at 
`manifoldcf-$foo.staged.apache.org`, i.e. `manifoldcf-cleanup-dec-2021.staged.apache.org`

