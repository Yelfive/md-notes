# Troubleshooting

## Port 80 occupied

```bash
# sudo killall httpd
ps aux|grep httpd

sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist
```

`launchctl` is used to manage `launchd`, while `launchd` manages all the daemon processes, such as apache `httpd`.

`launchctl` is similar to `systemctl` of `CentOS`

If you just call `sudo killall httpd`, the `httpd` will be started by `launchd` right after you killed it. So that's why it should be unloaded to be stopped.

**See Also**

- [What Is `launchd`, and Why Is It Running on My Mac?](https://www.howtogeek.com/319048/what-is-launchd-and-why-is-it-running-on-my-mac/)
- [`launchd`](http://www.launchd.info/)
- [`launchctl`'s Manual Page ](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/launchctl.1.html)

## WiFi disconnected

```bash
cd /Library/Preferences/SystemConfiguration
sudo rm -rf NetworkInterfaces.plist com.apple.airport.preferences.plist com.apple.network.eapolclient.configuration.plist preferences.plist
```

## Allow apps download from Anywhere

```bash
sudo spctl --master-disable
```

## pmset

```bash
sudo pmset -a autopoweroff 0
```