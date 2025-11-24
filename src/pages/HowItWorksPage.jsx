import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/ui'

/**
 * HowItWorksPage Component
 *
 * Detailed explanation of how FitConnect works for users and studios.
 * Features step-by-step guide, benefits, and FAQ.
 */
export default function HowItWorksPage() {
  const navigate = useNavigate()

  const steps = [
    {
      number: '1',
      title: 'Discover Classes',
      description: 'Browse hundreds of fitness classes from local studios. Filter by type, difficulty, price, and location to find the perfect class for you.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: [
        'Search by class type (Yoga, Pilates, Boxing, etc.)',
        'Filter by difficulty level',
        'View real-time availability',
        'See instructor profiles and studio details'
      ]
    },
    {
      number: '2',
      title: 'Book Your Spot',
      description: 'Reserve your spot instantly with our simple booking process. See class details, instructor info, and studio location all in one place.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        'Instant booking confirmation',
        'Secure payment processing',
        'Add to your calendar automatically',
        'Receive booking reminders'
      ]
    },
    {
      number: '3',
      title: 'Attend & Enjoy',
      description: 'Show up to your class with your booking confirmation. Check in with the studio and enjoy your workout!',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      features: [
        'Easy check-in process',
        'Access to all class amenities',
        'Rate and review your experience',
        'Track your fitness journey'
      ]
    }
  ]

  const benefits = [
    {
      title: 'Flexible Scheduling',
      description: 'Book classes that fit your schedule, from early morning to late evening.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'No Commitments',
      description: 'Pay per class or buy packages - no long-term contracts required.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Variety of Classes',
      description: 'Access to multiple studios and class types all in one place.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: 'Easy Cancellation',
      description: 'Cancel or reschedule classes up to 2 hours before start time.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How FitConnect Works
          </h1>
          <p className="text-xl text-primary-50 max-w-3xl mx-auto">
            Discover, book, and attend fitness classes at local studios - all in three simple steps
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center`}
              >
                {/* Icon & Number */}
                <div className="lg:w-1/3 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4 text-primary-600">
                    {step.icon}
                  </div>
                  <div className="text-6xl font-bold text-primary-600 mb-2">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <Card className="lg:w-2/3 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose FitConnect?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Experience the benefits of a flexible fitness platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do I need a membership?
              </h3>
              <p className="text-gray-600">
                No! FitConnect allows you to book classes individually without any membership fees. Simply create a free account, browse classes, and pay per booking.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I cancel my booking?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel or reschedule your booking up to 2 hours before the class starts for a full refund. After that, cancellations may be subject to studio policies.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I check in for a class?
              </h3>
              <p className="text-gray-600">
                Simply show your booking confirmation (email or app) to the studio staff when you arrive. They'll verify your reservation and get you checked in.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What if a class is full?
              </h3>
              <p className="text-gray-600">
                You can join the waitlist for full classes. If a spot opens up, we'll notify you immediately and you can confirm your booking.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Are there any hidden fees?
              </h3>
              <p className="text-gray-600">
                No hidden fees! The price you see is the price you pay. Some studios may have equipment rental fees, but these are clearly displayed before booking.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-50 mb-8">
            Start discovering amazing fitness classes near you today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="large"
              onClick={() => navigate('/discover')}
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Browse Classes
            </Button>
            <Button
              variant="outline"
              size="large"
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
