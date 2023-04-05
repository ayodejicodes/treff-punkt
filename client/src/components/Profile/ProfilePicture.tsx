interface ProfilePicture {
  size: number;
}

const ProfilePicture = ({ size }: ProfilePicture) => {
  return (
    <img
      src="../../src/assets/ayo.jpg"
      alt="cover-pic"
      className={`object-cover w-${size} h-${size} rounded-full`}
    />
  );
};
export default ProfilePicture;
