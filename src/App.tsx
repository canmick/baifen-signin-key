import CryptoES from "crypto-es";

const genKey = () => {
  const keys = ["CH", "IPS@", "20220", "9#DES"];
  return CryptoES.enc.Utf8.parse(keys.sort().join(""));
};

const genIv = () => {
  return CryptoES.enc.Utf8.parse("ABCDEF1234123412");
};

// 解密方法
export function Decrypt(word: string) {
  const key = genKey();
  const iv = genIv();
  const decrypt = CryptoES.TripleDES.decrypt(word, key, {
    iv,
    mode: CryptoES.mode.ECB,
    padding: CryptoES.pad.Pkcs7,
  });
  return decrypt.toString(CryptoES.enc.Utf8);
}

// 加密方法
export function Encrypt(word: string) {
  const key = genKey();
  const iv = genIv();
  const srcs = CryptoES.enc.Utf8.parse(word);

  const encrypted = CryptoES.TripleDES.encrypt(srcs, key, {
    iv,
    mode: CryptoES.mode.ECB,
    padding: CryptoES.pad.Pkcs7,
  });
  return encrypted.toString();
}

const minute = 60 * 1000;
const day = 24 * 60 * minute;
const week = 7 * day;
const month = 4 * week;

const getTime = (e: number) => JSON.stringify({ code: 0, t: Date.now(), e });

const minute_5 = 5 * minute;

function App() {
  return (
    <div className="App">
      <p>5分钟：{Encrypt(getTime(5 * minute))}</p>
      <p>1天：{Encrypt(getTime(day))}</p>
      <p>1周：{Encrypt(getTime(week))}</p>
      <p>1月：{Encrypt(getTime(month))}</p>
    </div>
  );
}

export default App;
