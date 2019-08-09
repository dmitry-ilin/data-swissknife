const cacache = require('cacache');
const path = require('path');
const pkgDir = require('pkg-dir');

const cachePath = path.join(pkgDir.sync(), '.dtstorage');


const x = {};

x.ls = () => cacache.ls(cachePath);
x.ls.stream = () => cacache.ls.stream(cachePath);

x.get = (key, opts) => cacache.get(cachePath, key, opts);
x.get.byDigest = (hash, opts) => cacache.get.byDigest(cachePath, hash, opts);
x.get.sync = (key, opts) => cacache.get.sync(cachePath, key, opts);
x.get.sync.byDigest = (key, opts) => cacache.get.sync.byDigest(cachePath, key, opts);
x.get.stream = (key, opts) => cacache.get.stream(cachePath, key, opts);
x.get.stream.byDigest = (hash, opts) => cacache.get.stream.byDigest(cachePath, hash, opts);
x.get.copy = (key, dest, opts) => cacache.get.copy(cachePath, key, dest, opts);
x.get.copy.byDigest = (hash, dest, opts) => cacache.get.copy.byDigest(cachePath, hash, dest, opts);
x.get.info = key => cacache.get.info(cachePath, key);
x.get.hasContent = hash => cacache.get.hasContent(cachePath, hash);
x.get.hasContent.sync = hash => cacache.get.hasContent.sync(cachePath, hash);

x.put = (key, data, opts) => cacache.put(cachePath, key, data, opts);
x.put.stream = (key, opts) => cacache.put.stream(cachePath, key, opts);

x.rm = key => cacache.rm.entry(cachePath, key);
x.rm.all = () => cacache.rm.all(cachePath);
x.rm.entry = x.rm;
x.rm.content = hash => cacache.rm.content(cachePath, hash);

x.setLocale = lang => cacache.setLocale(lang);
x.clearMemoized = () => cacache.clearMemoized();

x.tmp = {};
x.tmp.mkdir = opts => cacache.tmp.mkdir(cachePath, opts);
x.tmp.withTmp = (opts, cb) => cacache.tmp.withTmp(cachePath, opts, cb);

x.verify = opts => cacache.verify(cachePath, opts);
x.verify.lastRun = () => cacache.verify.lastRun(cachePath);

module.exports = x;
