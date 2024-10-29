import React from 'react';
import diagram from './img/img1.png'; // Import the image file

function TrangTru() {
  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.title}>Chào Mừng Đến Với MD5</h1>
        <p style={styles.bannerText}>Tìm hiểu về thuật toán băm MD5 và ứng dụng của nó!</p>
      </div>

      <h2 style={styles.subtitle}>Lý Thuyết Cơ Bản Về MD5</h2>
      <p style={styles.paragraph}>
        MD5 (Message Digest Algorithm 5) là một hàm băm mật mã học, được thiết kế để sử dụng như một mã kiểm tra để phát hiện dữ liệu bị hỏng. MD5 tạo ra một chuỗi băm dài 128-bit (16 byte) từ một chuỗi dữ liệu đầu vào. Nó thường được sử dụng để kiểm tra tính toàn vẹn của tệp và trong các ứng dụng bảo mật khác.
      </p>

      <h2 style={styles.subtitle}>Sơ Đồ Giải Thuật MD5</h2>
      <img src={diagram} alt="MD5 Algorithm Diagram" style={styles.image} />
      <p style={styles.paragraph}>
        Sơ đồ trên minh họa cách thuật toán MD5 xử lý các khối dữ liệu đầu vào, bắt đầu từ việc bổ sung (padding) cho đến khi đạt được mã băm cuối cùng. Thuật toán chia thông điệp thành các khối 512-bit và xử lý từng khối để tạo ra mã băm dài 128-bit.
      </p>

      <h2 style={styles.subtitle}>Các Đặc Điểm Chính Của MD5</h2>
      <ul style={styles.featureList}>
        <li style={styles.featureItem}>Tạo ra mã băm cố định dài 128-bit từ mọi đầu vào</li>
        <li style={styles.featureItem}>Nhanh chóng và hiệu quả trong việc tính toán</li>
        <li style={styles.featureItem}>Được sử dụng rộng rãi trong các ứng dụng kiểm tra tính toàn vẹn của dữ liệu</li>
      </ul>

      <h2 style={styles.subtitle}>Ví Dụ Về MD5</h2>
      <p style={styles.paragraph}>
        Ví dụ, khi băm chuỗi "hello world" bằng MD5, kết quả sẽ là: 
        <code style={styles.code}>5eb63bbbe01eeed093cb22bb8f5acdc3</code>.
      </p>

      <h2 style={styles.subtitle}>Ứng Dụng Của MD5</h2>
      <p style={styles.paragraph}>
        MD5 được sử dụng trong việc xác thực dữ liệu tải xuống từ Internet, kiểm tra tính toàn vẹn của tệp sau khi tải xuống và trong một số trường hợp mã hóa mật khẩu.
      </p>

      <h2 style={styles.subtitle}>Lưu Ý Về Bảo Mật</h2>
      <p style={styles.paragraph}>
        Mặc dù MD5 vẫn phổ biến, nhưng hiện tại nó không còn được xem là an toàn cho các mục đích bảo mật do có những điểm yếu đã được phát hiện, cho phép tấn công va chạm (collision attack). Các thuật toán mới như SHA-256 hiện đang được ưu tiên sử dụng.
      </p>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 Trang MD5. Bảo lưu mọi quyền.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: 'calc(100% - 250px)', // Set width relative to the menu width
    height: '100vh', // Set height to match the menu
    overflowY: 'auto', // Allow scrolling if content overflows
  },
  banner: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
  },
  bannerText: {
    margin: '10px 0 0',
  },
  subtitle: {
    color: '#28a745',
    marginTop: '20px',
  },
  paragraph: {
    color: '#555',
    fontSize: '1rem',
    marginBottom: '10px',
  },
  featureList: {
    listStyleType: 'none',
    padding: 0,
  },
  featureItem: {
    marginBottom: '10px',
    color: '#555',
  },
  code: {
    display: 'block',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '5px',
    marginTop: '10px',
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    marginTop: '10px',
    borderRadius: '10px',
  },
  footer: {
    marginTop: '20px',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
    color: '#999',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
  },
};

export default TrangTru;
