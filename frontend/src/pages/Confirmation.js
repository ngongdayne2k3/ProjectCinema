import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Confirmation = () => {
    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            <h1>✅ Bạn đã đặt vé thành công!</h1>
            <p>Vui lòng kiểm tra email hoặc tin nhắn để nhận vé.</p>

            {/* Quay lại trang chủ */}
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">Quay về trang chủ</Button>
            </Link>
        </div>
    );
};

export default Confirmation;
