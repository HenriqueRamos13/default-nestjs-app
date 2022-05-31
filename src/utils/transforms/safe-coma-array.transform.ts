export const SafeComaArrayTransform = ({ value }) => {
  try {
    return value.split(',');
  } catch (error) {
    return value;
  }
};
