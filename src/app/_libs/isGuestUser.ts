export const isGuestUser = (email: string | undefined): boolean => {
  const guestEmail = process.env.GUEST_EMAIL;

  if (!email || !guestEmail) return false;

  return email === guestEmail;
};
