import { CustomBreadcrumb } from '@/components/shared/custom-breadcrumb';
import { PageHeader } from '@/components/shared/page-header';
import getData from '@/lib/services/get-data.service';
import { CircleQuestionMark } from 'lucide-react';

export default async function ExamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { examId: string };
}) {
  const questions = await getData(`questions?exam=${params.examId}`);
  const examTitle = questions?.questions?.[0]?.exam?.title;

  return (
    <>
      <CustomBreadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Exams", href: "/exams" },
          { label: examTitle },
          { label: "Questions" },
        ]}
      />

      <PageHeader>
        <div className="flex items-center gap-2">
          <CircleQuestionMark className="w-10 h-10" />
          <span className="text-3xl">[{examTitle}]</span>
        </div>
      </PageHeader>

      {children}
    </>
  );
}
