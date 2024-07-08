/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./api/user/schema/user.schema"), { "User": { email: { required: true, type: () => String }, username: { required: true, type: () => String }, password: { required: true, type: () => String }, avatar: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, githubId: { required: true, type: () => Number } } }], [import("./api/user/dto/user.dto"), { "FindUserByEmailDto": { email: { required: true, type: () => String } }, "createUserDto": { password: { required: true, type: () => String }, code: { required: true, type: () => String }, confirm_password: { required: true, type: () => String } } }], [import("./api/auth/dto/auto.dto"), { "SendVerificationCodeDto": { account: { required: true, type: () => String } }, "VerificationResponseDto": { verificationId: { required: true, type: () => String } } }], [import("./common/dto/response.dto"), { "ResponseDto": { code: { required: false, type: () => Number }, message: { required: false, type: () => String }, data: { required: false }, timestamp: { required: false, type: () => String } } }], [import("./api/login/dto/login.dto"), { "EmailLoginDto": { email: { required: true, type: () => String }, captcha: { required: true, type: () => String } } }], [import("./base/pagination.dto"), { "PaginationResponse": { message: { required: true, type: () => String }, body: { required: true, type: () => Object }, meta: { required: true, type: () => ({ pagination: { required: true, type: () => ({ currentPage: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, total: { required: true, type: () => Number }, totalPages: { required: true, type: () => Number } }) } }) } }, "PaginationOption": { page: { required: true, type: () => Number, minimum: 0 }, limit: { required: true, type: () => Number, minimum: 1, maximum: 1000 } } }]], "controllers": [[import("./api/user/user.controller"), { "UserController": { "getUserInfo": { type: Object } } }], [import("./api/auth/auth.controller"), { "AuthController": { "sendVerificationCode": {} } }], [import("./api/login/login.controller"), { "LoginController": { "emailLogin": {}, "generateCaptcha": {} } }]] } };
};