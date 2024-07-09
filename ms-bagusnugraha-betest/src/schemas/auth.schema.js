exports.signup = {
  type: "object",
  properties: {
    fullName: {
      type: "string",
      isNotEmpty: true,
    },
    email: {
      type: "string",
      format: "email",
      isNotEmpty: true,
    },
    userName: {
      type: "string",
      isNotEmpty: true,
    },
    password: {
      type: "string",
      minLength: 6,
      isNotEmpty: true,
    },
  },
  required: ["fullName", "email", "userName", "password"],
};

exports.login = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      isNotEmpty: true,
    },
    password: {
      type: "string",
      minLength: 6,
      isNotEmpty: true,
    },
  },
  required: ["userName", "password"],
};
