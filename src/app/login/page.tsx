import { LoginForm } from '@/components/auth/LoginForm';
import { PublicLayout } from '@/components/layout/PublicLayout';

export default function LoginPage() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center py-8 md:py-12">
        <LoginForm />
      </div>
    </PublicLayout>
  );
}
