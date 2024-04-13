// const fetchAndProcessXHRRequests = () => {
//     // Lấy tất cả các XHR requests
//     // const xhrRequests = performance.getEntriesByType('resource').filter(resource => 
//     //     resource.initiatorType === 'xmlhttprequest' && 
//     //     (resource.name.includes('app.toidispy.com/api/lib?') || 
//     //      resource.name.includes('app.toidispy.com/api/post?') ||
//     //      resource.name.includes('app.spybadao.com/api/v2/posts?'))
//     // );
//     const requestsVoucher = performance.getEntriesByType('resource').filter(resource => 
//         resource.initiatorType === 'fetch' &&  resource.name.includes('home.voucher'))

//     // Xử lý và trích xuất URL từ các requests
//     // const xhrUrls = requestsVoucher.map(xhr => xhr.name);

//     // Tạo chuỗi CSV từ các URL

//     // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     // const url = URL.createObjectURL(blob);
//     console.log(requestsVoucher)

//     // Tạo và trigger một anchor tag để tải xuống CSV
//     // const link = document.createElement('a');
//     // link.setAttribute('href', url);
//     // link.setAttribute('download', 'api_urls.csv');
//     // link.style.visibility = 'hidden';
//     // document.body.appendChild(link);
//     // link.click();
//     // document.body.removeChild(link);

//     // Xóa bộ đệm để chuẩn bị cho lần lấy dữ liệu tiếp theo
//     performance.clearResourceTimings();
// }

// // Thiết lập interval để chạy hàm lấy dữ liệu định kỳ mỗi 5000 ms (5 giây)
// setInterval(fetchAndProcessXHRRequests, 15000);
