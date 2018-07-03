<%_ if(packages.includes('hadron-typeorm')) { _%>
// Basic CRUD operations for the user entity.

module.exports = {
  getUser: {
    path: '/user/get/:id',
    methods: ['GET'],
    callback: async (req, { userRepository }) => {
      const { id } = req.params;
      const user = await userRepository.findOne({ id });

      if (user) {
        return { body: user };
      } else {
        return { status: 404 };
      }
    },
  },

  createUser: {
    path: '/user/create',
    methods: ['POST'],
    callback: async (req, { userRepository }) => {
      const { name, age } = req.body;
      const user = await userRepository.save({ name, age });
      return { status: 201, body: user };
    },
  },

  updateUser: {
    path: '/user/update/:id',
    methods: ['PUT'],
    callback: async (req, { userRepository }) => {
      const { id } = req.params;
      const { name, age } = req.body;

      const user = await userRepository.findOne({ id });
      if (!user) {
        return { status: 404 };
      }

      user.name = name || user.name;
      user.age = age || user.age;

      const updatedUser = await userRepository.save(user);
      return { body: updatedUser };
    },
  },

  deleteUser: {
    path: '/user/delete/:id',
    methods: ['DELETE'],
    callback: async (req, { userRepository }) => {
      const { id } = req.params;
      const user = await userRepository.findOne({ id });
      if (!user) {
        return { status: 404 };
      }

      const removed = await userRepository.remove(user);
      if (removed) {
        return { status: 204 };
      }
    },
  },
};
<%_ } _%>
