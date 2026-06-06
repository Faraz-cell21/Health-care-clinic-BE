export const USER_TYPES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
  
    ADMIN: 'ADMIN',
  
    DOCTOR: 'DOCTOR',
  
    RECEPTIONIST: 'RECEPTIONIST',
  
    LAB_TECHNICIAN:
      'LAB_TECHNICIAN',
  
    BILLING_STAFF:
      'BILLING_STAFF',
  
    PATIENT: 'PATIENT',
  } as const;
  
  export type UserType =
    (typeof USER_TYPES)[keyof typeof USER_TYPES];