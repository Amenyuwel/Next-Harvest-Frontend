import React from "react";

const FieldsMap = () => (
  <section className="bg-white rounded-2xl shadow p-4 h-full w-full flex flex-col">
    <header className="mb-3 flex-shrink-0">
      <h2 className="text-lg font-bold text-black">Farm Fields Location</h2>
    </header>
    <div className="bg-[var(--color-background-off-white)] rounded-xl p-3 flex-1 flex flex-col min-h-0">
      <iframe
        title="Interactive map showing farm field locations in General Santos City"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: "8px" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62813.01392492741!2d125.099519!3d6.116394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f7b7e2e2e2e2e2%3A0x7e2e2e2e2e2e2e2e!2sGeneral%20Santos%20City!5e0!3m2!1sen!2sph!4v1688888888888!5m2!1sen!2sph"
        aria-label="Map of farm locations"
      ></iframe>
    </div>
  </section>
);

export default FieldsMap;
