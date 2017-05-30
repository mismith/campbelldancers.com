<template>
  <div class="register">
    <section id="register" class="bg-tartan">
      <header>
        <h2><a href="#register">Register</a></h2>
      </header>

      <form method="post" action="//formspree.io/hello@campbelldancers.com" target="_blank">
        <input type="text" name="_gotcha" style="display: none;" />
        <input type="hidden" name="_subject" value="Registration Form on CSHD" />
        <table class="table">
          <tbody>
            <tr>
              <td>Dancer's name</td>
              <td>
                <div class="two-inputs">
                  <input type="text" name="first_name" placeholder="First" required autofocus />
                  <input type="text" name="last_name" placeholder="Last" required />
                </div>
              </td>
            </tr>
            <tr>
              <td>Dancer's age</td>
              <td>
                <input type="text" name="age" required />
              </td>
            </tr>
            <tr>
              <td>Competitive level</td>
              <td>
                <select name="ability" required>
                  <optgroup>
                    <option>Non-competitive</option>
                  </optgroup>
                  <optgroup>
                    <option>New</option>
                    <option>Beginner</option>
                    <option>Novice</option>
                    <option>Intermediate</option>
                    <option>Premier</option>
                  </optgroup>
                  <optgroup>
                    <option>New Adult</option>
                    <option>Returning/Experienced Adult</option>
                  </optgroup>
                </select>
              </td>
            </tr>
            <tr>
              <td>Your email</tD>
              <td>
                <input type="email" name="email" required />
              </td>
            </tr>
            <tr>
              <td>Comments</td>
              <td>
                <textarea name="comments" placeholder="(optional)"></textarea>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>
                <button type="submit" class="btn btn-default">Register</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'register',
};
</script>

<style lang="postcss">
@import '../variables.css';

</style>
