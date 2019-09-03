exports.checkCreateUserData = body =>
  new Promise((resolve, reject) => {
    // fat arrow
    if (body) {
      resolve(body);
    } else {
      const reason = new Error('mom is not happy');
      reject(reason);
    }
  });
