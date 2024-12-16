import React, { useState } from 'react';

// MD5 hashing function
export function md5File(file) {
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

  function ConvertToWordArray(byteArray) {
    var lWordCount;
    var lMessageLength = byteArray.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (byteArray[lByteCount] << lBytePosition));
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

  // File reading logic
  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        resolve(new Uint8Array(e.target.result));  // File data as byte array
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);  // Read file as binary array buffer
    });
  }

  async function calculateMD5(file) {
    const byteArray = await readFile(file);
    let x = ConvertToWordArray(byteArray);
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;

   
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    for (let k = 0; k < x.length; k += 16) {
      let AA = a;
      let BB = b;
      let CC = c;
      let DD = d;

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
     
      a = AddUnsigned(a, AA);
      b = AddUnsigned(b, BB);
      c = AddUnsigned(c, CC);
      d = AddUnsigned(d, DD);
    }

    const result = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return result.toLowerCase();
    
  }

  return calculateMD5(file);
}

// React component to handle file input and display MD5 hash
function FileMD5() {
  const [originalFileHash, setOriginalFileHash] = useState('');
  const [suspectFileHash, setSuspectFileHash] = useState('');
  const [originalFileName, setOriginalFileName] = useState('');
  const [suspectFileName, setSuspectFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileComparisonResult, setFileComparisonResult] = useState('');
  const [uploadTime, setUploadTime] = useState(null);
  const [mode, setMode] = useState('hash'); // Chế độ "hash" hoặc "compare"

  // Tính toán MD5 cho file
  const handleFileChange = async (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const startTime = new Date();

      try {
        const hash = await md5File(file);
        const endTime = new Date();
        setUploadTime((endTime - startTime) / 1000); // Thời gian tính toán MD5 (giây)

        if (fileType === 'original') {
          setOriginalFileHash(hash);
          setOriginalFileName(file.name);
        } else {
          setSuspectFileHash(hash);
          setSuspectFileName(file.name);

          // So sánh file nếu chế độ là "compare"
          if (mode === 'compare' && originalFileHash) {
            if (hash === originalFileHash) {
              setFileComparisonResult('Tệp nghi ngờ giống hệt với tệp gốc.');
            } else {
              setFileComparisonResult('Tệp nghi ngờ đã bị sửa đổi hoặc khác với tệp gốc.');
            }
          }
        }
      } catch (error) {
        console.error(error);
        setOriginalFileHash('Error generating MD5');
      }

      setLoading(false);
    }
  };

  // Chế độ hoạt động: "hash" hoặc "compare"
  const toggleMode = () => {
    setMode(mode === 'hash' ? 'compare' : 'hash');
    setOriginalFileHash('');
    setSuspectFileHash('');
    setFileComparisonResult('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(suspectFileHash).then(() => {
      alert('MD5 Hash copied to clipboard!');
    });
  };

  return (
    <div className="container" style={styles.container}>
      <h2 className="title" style={styles.title}>MD5 File Hash</h2>

      <div className="modeSwitch" style={styles.modeSwitch}>
        <button 
          onClick={toggleMode} 
          className="modeButton" 
          style={styles.modeButton}
        >
          Switch to {mode === 'hash' ? 'Compare Mode' : 'Hash Mode'}
        </button>
      </div>

      {mode === 'hash' ? (
        <div className="inputGroup" style={styles.inputGroup}>
          <h3>Select File to Hash:</h3>
          <input 
            type="file" 
            onChange={(e) => handleFileChange(e, 'original')} 
            className="input" 
            style={styles.input} 
          />
        </div>
      ) : (
        <>
          <div className="inputGroup" style={styles.inputGroup}>
            <h3>Select Original File:</h3>
            <input 
              type="file" 
              onChange={(e) => handleFileChange(e, 'original')} 
              className="input" 
              style={styles.input} 
            />
          </div>

          <div className="inputGroup" style={styles.inputGroup}>
            <h3>Select Suspect File:</h3>
            <input 
              type="file" 
              onChange={(e) => handleFileChange(e, 'suspect')} 
              className="input" 
              style={styles.input} 
            />
          </div>
        </>
      )}

      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        <div className="resultGroup" style={styles.resultGroup}>
          {originalFileHash && (
            <p className="resultTitle" style={styles.resultTitle}>
             Băm MD5 của tệp gốc ({originalFileName}): {originalFileHash}
            </p>
          )}
          {suspectFileHash && (
            <p className="resultTitle" style={styles.resultTitle}>
            Băm MD5 của tệp nghi ngờ ({suspectFileName}): {suspectFileHash}
            </p>
          )}
          {uploadTime && <p className="hashInfo" style={styles.hashInfo}>Calculated in: {uploadTime} seconds</p>}
          {fileComparisonResult && <p style={styles.hashInfo}>{fileComparisonResult}</p>} {/* Hiển thị kết quả so sánh */}
          <div className="buttonGroup" style={styles.buttonGroup}>
            {suspectFileHash && (
              <button 
                onClick={handleCopy} 
                className="buttonCopy" 
                style={styles.buttonCopy}
              >
                Copy Hash
              </button>
            )}
            <button 
              onClick={() => {setOriginalFileHash(''); setSuspectFileHash(''); setFileComparisonResult('')}} 
              className="buttonReset" 
              style={styles.buttonReset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "850px",
    margin: "auto",
    marginTop: "50px",
    fontFamily: "'Arial', sans-serif",
    maxHeight: "90vh",
    overflowY: "auto",
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
  input: {
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  },
  resultGroup: {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "20px",
    border: "1px solid #ddd",
    maxHeight: "300px",
    overflowY: "auto",
  },
  resultTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  resultInput: {
    padding: "10px",
    width: "100%",
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
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
  buttonCopy: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#28a745",
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
  loadingText: {
    fontSize: "18px",
    color: "#007bff",
    fontWeight: "500",
  },
};
export default FileMD5;
