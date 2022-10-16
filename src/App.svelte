<script>
import SliderLayout from "./lib/components/SliderLayout.svelte";

const slides = [
    '/tf2-assets/scout.mp4',
    '/tf2-assets/solider.mp4',
    '/tf2-assets/pyro.mp4',
    '/tf2-assets/demoman.mp4',
    '/tf2-assets/heavy.mp4',
    '/tf2-assets/engineer.mp4',
    '/tf2-assets/medic.mp4',
    '/tf2-assets/sniper.mp4',
    '/tf2-assets/spy.mp4'
]
</script>

<SliderLayout slides={slides} />
