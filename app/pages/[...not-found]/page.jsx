import NotFound from "@/components/NotFound";

export default function PagesNotFound() {
  return (
    <NotFound
      title="Page Not Found"
      message="The page you're looking for doesn't exist in the dashboard. Please check the URL or use the sidebar navigation."
      showLoginButton={false}
    />
  );
}
