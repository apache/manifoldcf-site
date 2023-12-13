
# Verifying ManifoldCF releases

## Tools

 To verify ManifoldCF releases after version 1.6, you will need OpenPGP, which can be downloaded from [here](http://www.gnupg.org/download/).  

## Verifying a release

### Importing the public keys

Each release comes with a KEYS file. Before you can verify the release artifacts, you must import the KEYS file into OpenPGP.

Start by downloading the KEYS file for the release to your local machine. Be sure that you download this file from an Apache server -- not a mirror, or third-party server, but from www.apache.org itself. If you want, you can also verify that the contents of the KEYS file consists only of public keys that have been registered with various key authorities, such as [MIT's](http://pgp.mit.edu/).

Next, load the KEYS file into OpenPGP, using a command like this:

`gpg --import KEYS`

Perform the most basic level of verification by downloading the ASC signature file for the artifact, and then running a command such as this (good for both Windows and Unix):

`gpg --verify apache-manifoldcf-X.X.X-src.tar.gz.asc`

### Verifying the MD5 signature

To verify the MD5 signature of a release, download the artifact and the MD5 signature file for the artifact, and then run a Unix command such as this:

`gpg --print-md MD5 apache-manifoldcf-X.X.X-src.tar.gz | diff - apache-manifoldcf-X.X.X-src.tar.gz.md5`

On Windows:

`gpg --print-md MD5 apache-manifoldcf-X.X.X-src.tar.gz > capture.md5`<br/>`fc capture.md5 apache-manifoldcf-X.X.X-src.tar.gz.md5`

No differences will be printed if the signatures agree. If there are differences, then validity of the release cannot be verified.

### Verifying an SHA signature

To verify the SHA signature of a release, download the artifact and the SHA signature file for the artifact, and then run a Unix command such as this:

`gpg --print-md SHA512 apache-manifoldcf-X.X.X-src.tar.gz | diff - apache-manifoldcf-X.X.X-src.tar.gz.sha`

On Windows:

`gpg --print-md SHA512 apache-manifoldcf-X.X.X-src.tar.gz > capture.sha`<br/>`fc capture.sha apache-manifoldcf-X.X.X-src.tar.gz.sha`

No differences will be printed if the signatures agree. If there are differences, then validity of the release cannot be verified.
