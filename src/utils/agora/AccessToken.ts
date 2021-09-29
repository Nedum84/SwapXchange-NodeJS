import { BinaryLike, createHmac, KeyObject } from "crypto";
import { str as _str } from "crc-32";
import { UINT32 } from "cuint";
var version = "006";
var randomInt = Math.floor(Math.random() * 0xffffffff);
const VERSION_LENGTH = 3;
const APP_ID_LENGTH = 32;

class AccessToken {
  appID: any;
  appCertificate: any;
  channelName: any;
  messages: {};
  salt: number;
  ts: number;
  uid: string;
  build: () => string;
  addPriviledge: (priviledge: string | number, expireTimestamp: any) => void;
  fromString: (originToken: string) => boolean;
  signature: any;
  crc_channel_name: any;
  crc_uid: any;
  m: any;

  constructor(appID: any, appCertificate: any, channelName: any, uid: number) {
    let token: any = this;
    this.appID = appID;
    this.appCertificate = appCertificate;
    this.channelName = channelName;
    this.messages = {};
    this.salt = randomInt;
    this.ts = Math.floor(+new Date() / 1000) + 24 * 3600;
    if (uid === 0) {
      this.uid = "";
    } else {
      this.uid = `${uid}`;
    }

    this.build = function () {
      var m = Message({
        salt: token.salt,
        ts: token.ts,
        messages: token.messages,
      }).pack();

      var toSign = Buffer.concat([
        Buffer.from(token.appID, "utf8"),
        Buffer.from(token.channelName, "utf8"),
        Buffer.from(token.uid, "utf8"),
        m,
      ]);

      var signature = encodeHMac(token.appCertificate, toSign);
      var crc_channel = UINT32(_str(token.channelName))
        .and(UINT32(0xffffffff))
        .toNumber();
      var crc_uid = UINT32(_str(token.uid)).and(UINT32(0xffffffff)).toNumber();
      var content = AccessTokenContent({
        signature: signature,
        crc_channel: crc_channel,
        crc_uid: crc_uid,
        m: m,
      }).pack();
      return version + token.appID + content.toString("base64");
    };

    this.addPriviledge = function (
      priviledge: string | number,
      expireTimestamp: any
    ) {
      token.messages[priviledge] = expireTimestamp;
    };

    this.fromString = function (originToken: string) {
      try {
        const originVersion = originToken.substr(0, VERSION_LENGTH);
        if (originVersion != version) {
          return false;
        }
        var originAppID = originToken.substr(
          VERSION_LENGTH,
          VERSION_LENGTH + APP_ID_LENGTH
        );
        var originContent = originToken.substr(VERSION_LENGTH + APP_ID_LENGTH);
        var originContentDecodedBuf = Buffer.from(originContent, "base64");

        var content = unPackContent(originContentDecodedBuf);
        this.signature = content.signature;
        this.crc_channel_name = content.crc_channel_name;
        this.crc_uid = content.crc_uid;
        this.m = content.m;

        var msgs = unPackMessages(this.m);
        this.salt = msgs.salt;
        this.ts = msgs.ts;
        this.messages = msgs.messages;
      } catch (err) {
        console.log(err);
        return false;
      }

      return true;
    };
  }
}

const _version = version;
export { _version as version };
const _AccessToken = AccessToken;
export { _AccessToken as AccessToken };
export const priviledges = {
  kJoinChannel: 1,
  kPublishAudioStream: 2,
  kPublishVideoStream: 3,
  kPublishDataStream: 4,
  kRtmLogin: 1000,
};

var encodeHMac = function (
  key: BinaryLike | KeyObject,
  message: Buffer | BinaryLike
) {
  return createHmac("sha256", key).update(message).digest();
};

var ByteBuf = function () {
  var that: any = {
    buffer: Buffer.alloc(1024),
    position: 0,
  };

  that.buffer.fill(0);

  that.pack = function () {
    var out = Buffer.alloc(that.position);
    that.buffer.copy(out, 0, 0, out.length);
    return out;
  };

  that.putUint16 = function (v: number) {
    that.buffer.writeUInt16LE(v, that.position);
    that.position += 2;
    return that;
  };

  that.putUint32 = function (v: number) {
    that.buffer.writeUInt32LE(v, that.position);
    that.position += 4;
    return that;
  };

  that.putBytes = function (bytes: {
    length: number;
    copy: (arg0: Buffer, arg1: number) => void;
  }) {
    that.putUint16(bytes.length);
    bytes.copy(that.buffer, that.position);
    that.position += bytes.length;
    return that;
  };

  that.putString = function (
    str: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
  ) {
    return that.putBytes(Buffer.from(str));
  };

  //@ts-ignore
  that.putTreeMap = function (map: { [x: string]: any }) {
    if (!map) {
      that.putUint16(0);
      return that;
    }

    that.putUint16(Object.keys(map).length);
    for (var key in map) {
      that.putUint16(key);
      that.putString(map[key]);
    }

    return that;
  };

  that.putTreeMapUInt32 = function (map: { [x: string]: any }) {
    if (!map) {
      that.putUint16(0);
      return that;
    }

    that.putUint16(Object.keys(map).length);
    for (var key in map) {
      that.putUint16(key);
      that.putUint32(map[key]);
    }

    return that;
  };

  return that;
};

var ReadByteBuf = function (bytes: any) {
  var that: any = {
    buffer: bytes,
    position: 0,
  };

  that.getUint16 = function () {
    var ret = that.buffer.readUInt16LE(that.position);
    that.position += 2;
    return ret;
  };

  that.getUint32 = function () {
    var ret = that.buffer.readUInt32LE(that.position);
    that.position += 4;
    return ret;
  };

  that.getString = function () {
    var len = that.getUint16();

    var out = Buffer.alloc(len);
    that.buffer.copy(out, 0, that.position, that.position + len);
    that.position += len;
    return out;
  };

  that.getTreeMapUInt32 = function () {
    var map: any = {};
    var len = that.getUint16();
    for (var i = 0; i < len; i++) {
      var key = that.getUint16();
      var value = that.getUint32();
      map[key] = value;
    }
    return map;
  };

  return that;
};
var AccessTokenContent = function (options: {
  signature: any;
  crc_channel?: any;
  crc_uid: any;
  m: any;
  crc_channel_name?: any;
  pack?: any;
}) {
  options.pack = function () {
    //@ts-ignore
    var out = new ByteBuf();
    return out
      .putString(options.signature)
      .putUint32(options.crc_channel)
      .putUint32(options.crc_uid)
      .putString(options.m)
      .pack();
  };

  return options;
};

var Message = function (options: {
  salt: any;
  ts: any;
  messages: any;
  pack?: any;
}) {
  options.pack = function () {
    //@ts-ignore
    var out: any = new ByteBuf();
    var val = out
      .putUint32(options.salt)
      .putUint32(options.ts)
      .putTreeMapUInt32(options.messages)
      .pack();
    return val;
  };

  return options;
};

var unPackContent = function (bytes: Buffer) {
  //@ts-ignore
  var readbuf: any = new ReadByteBuf(bytes);
  return AccessTokenContent({
    signature: readbuf.getString(),
    crc_channel_name: readbuf.getUint32(),
    crc_uid: readbuf.getUint32(),
    m: readbuf.getString(),
  });
};

var unPackMessages = function (bytes: any) {
  //@ts-ignore
  var readbuf: any = new ReadByteBuf(bytes);
  return Message({
    salt: readbuf.getUint32(),
    ts: readbuf.getUint32(),
    messages: readbuf.getTreeMapUInt32(),
  });
};
