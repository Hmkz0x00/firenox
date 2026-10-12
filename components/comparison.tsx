import { Battery, Sparkles, Thermometer, Users, Wrench } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const visualFeatures = [
  { left: 'Heavy, bulky, difficult for children or seniors', label: 'Usability', icon: Users, right: 'Lightweight - intuitive Point & Spray' },
  { left: 'Slow, relies on oxygen starvation', label: 'Thermal Reduction', icon: Thermometer, right: 'Rapid cooling via high-penetration wetting' },
  { left: 'Corrosive, messy powder - damages electronics', label: 'Post-Fire Damage', icon: Sparkles, right: 'Minimal residue - evaporates cleanly' },
  { left: 'Mandatory annual pressure checks', label: 'Maintenance', icon: Wrench, right: 'Maintenance-free - ready throughout shelf life' },
  { left: 'Limited effectiveness', label: 'Lithium Battery', icon: Battery, right: 'Designed to penetrate cells and prevent ignition' },
] as const

export function Comparison() {
  return (
    <section id="comparison" className="scroll-mt-32 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                See the difference
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-bold uppercase leading-tight md:text-5xl">
                One answer for the <span className="text-primary">first response.</span>
              </h2>
              <div className="mt-4 section-rule" />
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:justify-self-end">
              Traditional extinguishers each solve a narrower problem. FIRENOX is
              positioned as a compact first-response option across the risks people
              encounter at home, on the road, and at work.
            </p>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="comparison-infographic mt-6" aria-label="HTML comparison infographic">
            <div className="comparison-infographic__headline">
              <div className="comparison-infographic__side comparison-infographic__side--traditional">
                <span className="comparison-infographic__side-title">Traditional</span>
                <strong>Fire Extinguishers</strong>
                <small>Multiple types. More complexity. Higher maintenance.</small>
              </div>
              <div className="comparison-infographic__versus" aria-hidden="true">VS</div>
              <div className="comparison-infographic__side comparison-infographic__side--firenox">
                <span className="comparison-infographic__side-title">FIRENOX</span>
                <strong>Fire Spray</strong>
                <small>One spray. All fires. A safer tomorrow.</small>
              </div>
            </div>

            <div className="comparison-matrix-wrap">
              <table className="comparison-matrix">
                <caption className="sr-only">Traditional extinguisher limitations compared with FIRENOX fire spray benefits</caption>
                <thead>
                  <tr>
                    <th scope="col">Traditional fire extinguishers</th>
                    <th scope="col">Feature</th>
                    <th scope="col">FIRENOX fire spray</th>
                  </tr>
                </thead>
                <tbody>
                  {visualFeatures.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <tr key={feature.label}>
                        <td>{feature.left}</td>
                        <th scope="row"><Icon aria-hidden="true" />{feature.label}</th>
                        <td><strong>{feature.right.split(' - ')[0]}</strong>{feature.right.includes(' - ') ? ` - ${feature.right.split(' - ').slice(1).join(' - ')}` : ''}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="comparison-matrix-mobile" aria-label="Mobile comparison summary">
              {visualFeatures.map((feature) => {
                const Icon = feature.icon
                const [emphasis, ...rest] = feature.right.split(' - ')
                return (
                  <article key={feature.label} className="comparison-matrix-mobile__item">
                    <h3 className="comparison-matrix-mobile__feature"><Icon aria-hidden="true" />{feature.label}</h3>
                    <div className="comparison-matrix-mobile__comparison">
                      <div>
                        <span className="comparison-matrix-mobile__label">Traditional</span>
                        <p>{feature.left}</p>
                      </div>
                      <div>
                        <span className="comparison-matrix-mobile__label comparison-matrix-mobile__label--firenox">FIRENOX</span>
                        <p><strong>{emphasis}</strong>{rest.length ? ` - ${rest.join(' - ')}` : ''}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
            <p className="comparison-infographic__note">
              Visual summary rebuilt as native HTML. Confirm current certifications and claims for your market before purchase.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
