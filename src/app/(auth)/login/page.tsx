import AuthForm from "@/components/layout/AuthForm";

export default function LoginPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-20">
            <AuthForm type="login" />
        </div>
    );
}
