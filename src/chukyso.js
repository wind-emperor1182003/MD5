import forge from 'node-forge';
import { useState } from 'react';

const Chukyso = () => {
  const [input, setInput] = useState('');
  const [hashValue, setHashValue] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');

  // Hàm băm MD5
  const md5 = (message) => {
    const md = forge.md.md5.create();
    md.update(message);
    return md.digest().toHex();
  };

  // Tạo cặp khóa RSA (private và public)
  const generateRSAKeys = () => {
    const keypair = forge.pki.rsa.generateKeyPair(128); // Tạo cặp khóa 2048-bit
    setPrivateKey(forge.pki.privateKeyToPem(keypair.privateKey));
    setPublicKey(forge.pki.publicKeyToPem(keypair.publicKey));
  };

  // Tạo chữ ký số
  const signMessage = (message) => {
    if (!privateKey) {
      alert('Hãy tạo khóa RSA trước!');
      return;
    }

    // Bước 1: Tạo giá trị băm MD5 từ thông điệp
    const hash = md5(message);
    setHashValue(hash);

    // Bước 2: Mã hóa giá trị băm bằng khóa riêng (ký thông điệp)
    const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
    const signature = privateKeyObj.sign(forge.md.md5.create().update(hash));
    setDigitalSignature(forge.util.encode64(signature));
  };

  // Xác minh chữ ký số
  const verifySignature = () => {
    if (!publicKey || !digitalSignature || !hashValue) {
      alert('Thiếu thông tin để xác minh!');
      return;
    }

    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
    const isValid = publicKeyObj.verify(
      forge.md.md5.create().update(hashValue).digest().bytes(),
      forge.util.decode64(digitalSignature)
    );

    alert(isValid ? 'Chữ ký hợp lệ!' : 'Chữ ký không hợp lệ!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Chữ Ký Số với MD5 + RSA</h1>
      <button
        onClick={generateRSAKeys}
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Tạo Cặp Khóa RSA
      </button>
      <div>
        <h3>Khóa Riêng</h3>
        <textarea value={privateKey} readOnly style={{ width: '100%', height: '100px' }} />
        <h3>Khóa Công Khai</h3>
        <textarea value={publicKey} readOnly style={{ width: '100%', height: '100px' }} />
      </div>
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <h2>Nhập Thông Điệp</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập thông điệp"
          style={{ width: '300px', padding: '10px', fontSize: '16px' }}
        />
      </div>
      <button
        onClick={() => signMessage(input)}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Tạo Chữ Ký Số
      </button>
      <div>
        <h3>Giá Trị Băm</h3>
        <div>{hashValue}</div>
        <h3>Chữ Ký Số</h3>
        <div>{digitalSignature}</div>
      </div>
      <button
        onClick={verifySignature}
        style={{
          backgroundColor: '#ffc107',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Xác Minh Chữ Ký
      </button>
    </div>
  );
};

export default Chukyso;
