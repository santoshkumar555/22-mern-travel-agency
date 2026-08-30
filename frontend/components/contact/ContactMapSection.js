import GlassCard from "@/components/common/GlassCard";

export default function ContactMapSection() {
    return (
        <div>
            <div className="mb-6 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Find Us</p>
                <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Visit our location</h2>
            </div>
            <GlassCard className="overflow-hidden p-0">
                <div className="h-[420px] w-full">
                    <iframe title="Mumbai Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.2179731817146!2d72.84971107466886!3d19.229329847142193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0d42c95bdf9%3A0x5a3374a957943f4b!2sTryCatch%20Classes%20%7C%20Gen%20AI%20%7C%20Data%20Analytics%20%7C%20Business%20Analytics%20%7C%20Full%20Stack%20with%20AI%20%7C%20Flutter%20%7C%20Digital%20Marketing%20Training!5e0!3m2!1sen!2sin!4v1781274953102!5m2!1sen!2sin"
                        className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </GlassCard>
        </div>
    );
}
