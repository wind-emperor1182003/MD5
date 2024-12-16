import React, { useState } from "react";


// MD5 hash function in JavaScript
export function md5(string) {
  function RotateLeft(lValue, iShiftBits) { 
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }

  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }

  function F(x, y, z) { return (x & y) | ((~x) & z); }
  function G(x, y, z) { return (x & z) | (y & (~z)); }
  function H(x, y, z) { return (x ^ y ^ z); }
  function I(x, y, z) { return (y ^ (x | (~z))); }

  function FF(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  function GG(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  function HH(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  function II(a, b, c, d, x, s, ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  }

  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  function WordToHex(lValue) {
    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  }

  let x = Array();
  let k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

 
  string = Utf8Encode(string);

  x = ConvertToWordArray(string);

  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;

  var FF_values = [];
  var GG_values = [];
  var HH_values = [];
  var II_values = [];
 

  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;

    // Vòng FF
    a = FF(a, b, c, d, x[k], S11, 0xD76AA478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    // Lưu giá trị sau vòng FF
    FF_values.push([a, b, c, d]);

    // Vòng GG
    a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = GG(b, c, d, a, x[k], S24, 0xE9B6C7AA);
    a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    // Lưu giá trị sau vòng GG
    GG_values.push([a, b, c, d]);

    // Vòng HH
    a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = HH(d, a, b, c, x[k], S32, 0xEAA127FA);
    c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x04881D05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    // Lưu giá trị sau vòng HH
    HH_values.push([a, b, c, d]);

    // Vòng II
    a = II(a, b, c, d, x[k], S41, 0xF4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    // Lưu giá trị sau vòng II
    II_values.push([a, b, c, d]);

    // Cộng lại với giá trị ban đầu
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }


  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
  return {
    hash: temp.toLowerCase(),
    FF: FF_values,
    GG: GG_values,
    HH: HH_values,
    II: II_values,
    final: { a: WordToHex(a), b: WordToHex(b), c: WordToHex(c), d: WordToHex(d) }
  };
}


function MD5Generator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [binaryInput, setBinaryInput] = useState(""); // State for binary input
  const [binaryPadded, setBinaryPadded] = useState(""); // State for padded 512-bit binary input
  const [copied, setCopied] = useState(false);
  const [ffValues, setFFValues] = useState([]);
  const [ggValues, setGGValues] = useState([]);
  const [hhValues, setHHValues] = useState([]);
  const [iiValues, setIIValues] = useState([]);
  const [finalValues, setFinalValues] = useState({ a: "", b: "", c: "", d: "" }); // State for final MD5 values
  

  const handleReset = () => {
    setInput("");
    setHash("");
    setBinaryInput("");
    setBinaryPadded("");
    setCopied(false);
    setFFValues([]);
    setGGValues([]);
    setHHValues([]);
    setIIValues([]);
    setFinalValues(null);
  };
  
  const handleEncrypt = () => {
    const result = md5(input);
    setHash(result.hash);
    const binary = stringToBinary(input);
    setBinaryInput(binary);
    setBinaryPadded(padTo512Bits(binary)); // Pad binary input to 512 bits
    setCopied(false); // Reset copy status when generating a new hash

    setFFValues(result.FF);  // Lưu các giá trị vòng FF
    setGGValues(result.GG);  // Lưu các giá trị vòng GG
    setHHValues(result.HH);  // Lưu các giá trị vòng HH
    setIIValues(result.II);  // Lưu các giá trị vòng II
    setFinalValues(result.final);
     
  };
  

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true); // Set copy status to true when copied
  };

  // Convert string to binary
  function stringToBinary(string) {
    return string.split('').map(char => {
      const binary = char.charCodeAt(0).toString(2);
      return '00000000'.slice(binary.length) + binary; // Pad to 8 bits
    }).join('');
  }

  // Pad binary string to 512 bits according to MD5 specification
  function padTo512Bits(binaryString) {
    // Remove any spaces and ensure it's a clean binary string
    let cleanBinary = binaryString.replace(/\s+/g, '');
    const originalLength = cleanBinary.length; // Original length in bits
    let paddedBinary = cleanBinary + '1'; // Append '1'

    // Pad with '0's until length is 448 modulo 512
    while (paddedBinary.length % 512 !== 448) {
      paddedBinary += '0';
    }

    // Append the original length as a 64-bit binary string
    const originalLengthBinary = originalLength.toString(2).padStart(64, '0');
    paddedBinary += originalLengthBinary; // Append the length of the original input in bits

    return paddedBinary; // Return the complete 512-bit padded binary string
  }
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tạo mã MD5</h2>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Chuỗi cần mã hóa *</label>
        <input
          type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (input.trim() === "") {
              alert("Vui lòng nhập chuỗi cần mã hóa!");
              return;
            }
            handleEncrypt();
          }
        }}
        placeholder="Nhập chuỗi"
        style={styles.input}
      />
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={handleEncrypt} style={styles.buttonEncrypt}>
          Mã hóa
        </button>
        <button onClick={handleCopy} style={styles.buttonCopy} disabled={!hash}>
          Sao chép
        </button>
        <button onClick={handleReset} style={styles.buttonReset}>
    Đặt lại
  </button>
      </div>
      
      {hash && (
        <div style={styles.resultGroup}>
          <h4 style={styles.resultTitle}>Kết quả</h4>
          <input
            type="text"
            value={hash}
            readOnly
            style={styles.resultInput}
          />
          <p
            style={{
              ...styles.hashInfo,
              color: copied ? "#28a745" : "#666",
            }}
          >
            Độ dài mã: {hash.length} ký tự - {copied ? "Đã sao chép!" : "Chưa sao chép"}
          </p>
        </div>
      )}
      {input && (
        <div style={styles.resultGroup}>
          <h4 style={styles.resultTitle}>Chuỗi nhị phân</h4>
          <input
            type="text"
            value={binaryInput}
            readOnly
            style={styles.resultInput}
          />
        </div>
      )}
     {binaryInput && (
  <div style={styles.resultGroup}>
    <h4 style={styles.resultTitle}>Chuỗi nhị phân 512 bit</h4>
    <textarea
      value={binaryPadded}
      readOnly
      style={{
        ...styles.resultInput, // Kế thừa các style hiện có
        whiteSpace: "pre-wrap", // Giữ định dạng và tự xuống hàng
        resize: "none", // Ngăn thay đổi kích thước nếu cần
        height: "auto", // Tự điều chỉnh chiều cao theo nội dung
      }}
      rows={8} // Số dòng hiển thị ban đầu (có thể điều chỉnh)
    />
  </div>
)}
      {binaryPadded && (
        <div style={styles.resultGroup}>
          <h4 style={styles.resultTitle}>16 Khối 512 bit</h4>
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} style={styles.blockRow}>
              <span style={styles.blockLabel}>Khối {index + 1}:</span>
              <input
                type="text"
                value={binaryPadded.slice(index * 32, (index + 1) * 32)}
                readOnly
                style={styles.resultInput}
              />
            </div>
          ))}
        </div>
      )}
    {ffValues.length > 0 && (
        <div style={styles.resultGroup}>
          <h4 style={styles.resultTitle}>Giá trị sau vòng FF</h4>
          {ffValues.map((val, index) => (
            <div key={index}>
              <p>Vòng {index + 1}: {JSON.stringify(val)}</p>
            </div>
          ))}
        </div>
      )}

      {ggValues.length > 0 && (
        <div style={styles.resultGroup}>
          <h4 style={styles.resultTitle}>Giá trị sau vòng GG</h4>
          {ggValues.map((val, index) => (
            <div key={index}>
              <p>Vòng {index + 2}: {JSON.stringify(val)}</p>
            </div>
          ))}
        </div>
      )}

      {hhValues.length > 0 && (
        <div style={styles.resultGroup}>
          <h4 style={styles.resultTitle}>Giá trị sau vòng HH</h4>
          {hhValues.map((val, index) => (
            <div key={index}>
              <p>Vòng {index + 3}: {JSON.stringify(val)}</p>
            </div>
          ))}
        </div>
      )}

      {iiValues.length > 0 && (
        <div style={styles.resultGroup}>
          <h4 style={styles.resultTitle}>Giá trị sau vòng II</h4>
          {iiValues.map((val, index) => (
            <div key={index}>
              <p>Vòng {index + 4}: {JSON.stringify(val)}</p>
            </div>
          ))}
        </div>
     )}
     {finalValues && (
       <div style={styles.resultGroup}>
         <h4 style={styles.resultTitle}>Giá trị cuối cùng của MD5 (Hex)</h4>
         <p>a: {finalValues.a}</p>
         <p>b: {finalValues.b}</p>
         <p>c: {finalValues.c}</p>
         <p>d: {finalValues.d}</p>
       </div>
     )}
   </div>
 );
}
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "850px",
    margin: "auto",
    marginTop: "50px",
    fontFamily: "'Arial', sans-serif",
    maxHeight: "90vh", // Chiều cao tối đa của container
    overflowY: "auto", // Cho phép cuộn dọc
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    color: "#555",
    marginBottom: "8px",
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  buttonEncrypt: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonCopy: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6c757d",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonReset: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  resultGroup: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "20px",
    border: "1px solid #ddd",
    maxHeight: "300px", // Chiều cao tối đa của phần kết quả
    overflowY: "auto", // Cho phép cuộn
  },
  resultTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  resultInput: {
    padding: "10px",
    width: "100%", // Tăng chiều rộng
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "15px",
    color: "#555",
    backgroundColor: "#fafafa",
    marginTop: "5px",
    boxSizing: "border-box",
  },
  hashInfo: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#007bff",
    fontWeight: "500",
  },
  blockRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },
  blockLabel: {
    fontSize: "15px",
    color: "#333",
    fontWeight: "bold",
    width: "80px",
  },
  buttonReset: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  
};
  

export default MD5Generator;
