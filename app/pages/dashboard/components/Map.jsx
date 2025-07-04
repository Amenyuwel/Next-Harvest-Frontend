import React from "react";

const FieldsMap = () => (
  <div className="relative">
    <div className="absolute -top-6 left-0">
      <span className="text-2xl font-bold text-black">Fields</span>
    </div>
    <div className="bg-white rounded-3xl shadow p-4 flex flex-col items-center mt-6">
      {" "}
      {/* Added mt-6 for space */}
      <div className="w-[300px] h-[284px] rounded-2xl overflow-hidden">
        <iframe
          title="Fields Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62813.01392492741!2d125.099519!3d6.116394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f7b7e2e2e2e2e2%3A0x7e2e2e2e2e2e2e2e!2sGeneral%20Santos%20City!5e0!3m2!1sen!2sph!4v1688888888888!5m2!1sen!2sph"
        ></iframe>
      </div>
    </div>
  </div>
);

export default FieldsMap;
