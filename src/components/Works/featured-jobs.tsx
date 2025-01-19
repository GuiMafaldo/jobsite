import JobCard from "@/app/dashboard/searchJobs/page"
import jobs from "@/utils/lista"

export default function FeaturedJobs() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Empregos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <JobCard 
              key={index}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              salary={job.salary}
              benefits={job.benefits}
              contractType={job.contractType}
              level={job.level}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

