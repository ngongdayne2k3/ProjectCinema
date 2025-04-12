class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.fullName = user.fullName;
        this.phone = user.phone;
        this.role = user.role;
        this.membershipPoints = user.membershipPoints;
        this.membershipLevel = user.membershipLevel;
        this.isActive = user.isActive;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}

class CreateUserDTO {
    constructor(data) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.fullName = data.fullName;
        this.phone = data.phone;
        this.role = data.role || 'user';
    }
}

class UpdateUserDTO {
    constructor(data) {
        if (data.username) this.username = data.username;
        if (data.email) this.email = data.email;
        if (data.password) this.password = data.password;
        if (data.fullName) this.fullName = data.fullName;
        if (data.phone) this.phone = data.phone;
        if (data.role) this.role = data.role;
        if (data.membershipPoints) this.membershipPoints = data.membershipPoints;
        if (data.membershipLevel) this.membershipLevel = data.membershipLevel;
        if (data.isActive !== undefined) this.isActive = data.isActive;
    }
}

class LoginDTO {
    constructor(data) {
        this.email = data.email;
        this.password = data.password;
    }
}

class ResetPasswordDTO {
    constructor(data) {
        this.password = data.password;
        this.resetPasswordToken = data.resetPasswordToken;
        this.resetPasswordExpires = data.resetPasswordExpires;
    }
}

module.exports = {
    UserDTO,
    CreateUserDTO,
    UpdateUserDTO,
    LoginDTO,
    ResetPasswordDTO
}; 