export const isValidUUID = (str: string): boolean => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(str);
}

export const isValidUserData = (userData: unknown): boolean => {
  if (userData instanceof Object &&
    "username" in userData &&
    "age" in userData &&
    "hobbies" in userData) {
    const isValidUserNameField = Boolean(userData.username && (typeof userData.username === 'string'));
    const isValidUserAgeField = typeof userData.age === 'number' && userData.age > 0;
    const isValidUserHobbies = userData.hobbies && Array.isArray(userData.hobbies);
    return isValidUserNameField && isValidUserAgeField && isValidUserHobbies ? true : false;
  }
  return false;
} 