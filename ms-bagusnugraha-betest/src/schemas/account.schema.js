exports.update = {
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
};
